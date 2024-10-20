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

router.post('/:jobId', auth, async (req, res) => {
    try {
        const { jobId } = req.params;
        console.log("Received application for job ID:", jobId);
        
        // Fetch the job profile by ID
        const job = await JobProfile.findById(jobId);
        if (!job) {
            console.log(`Job profile not found for ID: ${jobId}`);
            return res.status(404).json({ msg: 'Job profile not found' });
        }
        console.log("Job profile found:", job);

        // Fetch the intern profile using the authenticated user ID
        console.log("Authenticated user ID:", req.user.id);
        const internProfile = await InternProfile.findOne({ user: req.user.id });
        if (!internProfile) {
            console.log(`Intern profile not found for user ID: ${req.user.id}`);
            return res.status(404).json({ msg: 'Intern profile not found' });
        }
        console.log("Intern profile found:", internProfile);

        // Check if the resume is provided
        let resumeFileId = null; // Initialize resumeFileId
        if (req.file) {
            console.log("Resume file received:", req.file.originalname);
            // Create a file in GridFS only if a file is provided
            resumeFileId = await new Promise((resolve, reject) => {
                const writestream = gfs.createWriteStream({
                    filename: req.file.originalname,
                    content_type: req.file.mimetype,
                    metadata: { userId: req.user.id }
                });
                writestream.on('close', (file) => {
                    console.log("Resume file stored in GridFS with ID:", file._id);
                    resolve(file._id);
                });
                writestream.on('error', (error) => {
                    console.error("Error storing file in GridFS:", error);
                    reject(error);
                });
                writestream.end(req.file.buffer);
            });
        } else {
            console.log('No resume file provided in the request.');
        }

        // Create a new application
        const newApplication = {
            applicant: internProfile._id,         // Reference to intern profile
            resume: resumeFileId ? { fileId: resumeFileId } : null, // Store the GridFS file ID for the resume if provided
            status: 'Accepted'                     // Initial status
        };

        // Update the job posting with the new applicant
        job.applicants.push(newApplication);
        await job.save();
        console.log("Application submitted successfully for job ID:", jobId, "Applicant ID:", internProfile._id);
        console.log("Application details:", newApplication);

        res.status(200).json({ msg: 'Application submitted successfully!', application: newApplication });
    } catch (error) {
        console.error("Error during application submission:", error);
        res.status(500).json({ msg: 'Server error' });
    }
});


module.exports = router;
