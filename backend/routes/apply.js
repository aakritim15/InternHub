const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');
const auth = require('../middleware/auth');
const Application = require('../model/Apply');
const JobProfile = require('../model/Jobs');
const InternProfile = require('../model/profile/Intern');
const User = require('../model/User');

const router = express.Router();

// Initialize GridFS
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Multer storage configuration for resume uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Apply for a job
router.post('/:jobId', [auth], upload.single('resume'), async (req, res) => {
    try {
        const { jobId } = req.params;

        // Fetch the job profile by ID
        const job = await JobProfile.findById(jobId);
        if (!job) {
            return res.status(404).json({ msg: 'Job profile not found' });
        }
        console.log("the user id is: ", req.user.id)
        // Fetch the intern profile using the authenticated user ID
        const internProfile = await InternProfile.findOne({ user: req.user.id });
        if (!internProfile) {
            return res.status(404).json({ msg: 'Intern profile not found' });
        }

        // Check if the resume is provided
        if (!req.file) {
            return res.status(400).json({ msg: 'Resume file is required' });
        }

        // Create a file in GridFS
        const resumeFileId = await new Promise((resolve, reject) => {
            const writestream = gfs.createWriteStream({
                filename: req.file.originalname,
                content_type: req.file.mimetype,
                metadata: { userId: req.user.id }
            });
            writestream.on('close', (file) => resolve(file._id));
            writestream.on('error', reject);
            writestream.end(req.file.buffer);
        });

        // Create a new application
        const newApplication = {
            applicant: internProfile._id,         // Reference to intern profile
            resume: { fileId: resumeFileId },    // Store the GridFS file ID for the resume
            status: 'Accepted'                     // Initial status
        };

        // Update the job posting with the new applicant
        job.applicants.push(newApplication);
        await job.save();

        res.status(200).json({ msg: 'Application submitted successfully!', application: newApplication });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
