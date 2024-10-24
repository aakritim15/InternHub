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
router.post('/:jobId', auth, upload.single('resume'), async (req, res) => {
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
        let resumeFileId = null;
        if (req.file) {
            console.log("Resume file received:", req.file.originalname);
            // Store resume in GridFS
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

        // Create a new application document in the Application collection
        const newApplication = new Application({
            user: req.user.id,
            job: job._id,
            company: job.company,  // Assuming job profile has a company field
            status: 'Accepted',    // You can set this to 'pending' or 'accepted'
            resume: resumeFileId || undefined, // If resume is not provided, this will be undefined
        });

        // Save the application in the Application collection
        await newApplication.save();
        console.log("Application saved in the Application collection:", newApplication);

        // Update the job posting with the new applicant
        job.applicants.push(newApplication._id); // Link the Application to the job applicants
        await job.save();

        res.status(200).json({ msg: 'Application submitted successfully!', application: newApplication });
    } catch (error) {
        console.error("Error during application submission:", error);
        res.status(500).json({ msg: 'Server error' });
    }
});


router.get('/myApplications', auth, async (req, res) => {
    try {
        console.log("User ID: ", req.user.id); // Check the user ID
        const applications = await Application.find({ user: req.user.id })
            .populate('job', 'title description location salary status company'); // Populate job fields
        
        console.log("Applications found: ", applications); // Log what is returned from the DB

        if (applications.length === 0) {
            return res.status(404).json({ msg: 'No job applications found' });
        }
        const applicationData = applications.map(app => ({
            company: app.job.company,
            status: app.status,
            salary: app.job.salary,
            description: app.job.description
        }));

        res.json(applicationData);
    } catch (error) {
        console.error(error); // Log any errors
        res.status(500).json({ msg: 'Server error' });
    }
});



module.exports = router;
