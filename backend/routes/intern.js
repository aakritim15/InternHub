const express = require('express');
const auth = require('../middleware/auth');
const InternProfile = require('../model/profile/Intern');
const { check, validationResult } = require('express-validator');

const mongodb = require('mongodb');
const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const config = require('config');
const router = express.Router();

// MongoDB URI
const mongoURI = config.get('mongoURI');

// Initialize GridFS
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Set collection name for files
});

// GridFS Storage engine for file uploads
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: `file_${Date.now()}_${file.originalname}`,  // Custom filename
      metadata: {
        fieldname: file.fieldname,
      },
    };
  },
});     

// Set up Multer for file upload
const upload = multer({ storage });
const client = new mongodb.MongoClient(mongoURI);
const dbName = 'intern-profiles';
const db = client.db(dbName);
const bucket = new mongodb.GridFSBucket(db);
const uploadStream = bucket.openDownloadStreamByName('file');
const downloadStream = bucket.openUploadStream();


// Create or update intern profile with resume upload
router.post(
  '/createProfile',
  [
    auth,
    upload.single('resume'), // Upload single resume file
    [
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { website, location, description, skills, githubusername } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (description) profileFields.description = description;
    if (githubusername) profileFields.githubusername = githubusername;

    if (typeof skills === 'string') {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    // Handle resume file upload
    if (req.file) {
      profileFields.resume = {
        fileId: req.file.id, // GridFS file ID
      };
    }

    try {
      let profile = await InternProfile.findOne({ user: req.user.id });

      if (profile) {
        // Update profile if it exists
        profile = await InternProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // Create profile if it doesn't exist
      profile = new InternProfile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// Get all profiles
router.get('/getProfiles', async (req, res) => {
  try {
    const profiles = await InternProfile.find().populate('user');
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get one person's profile
router.get('/getProfile', [auth], async (req, res) => {
  try {
    const profiles = await InternProfile.findOne({ user: req.user.id }).populate('user');
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Update experience
router.put(
  '/createProfile/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await InternProfile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);

// Delete experience
router.delete('/createProfile/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await InternProfile.findOne({ user: req.user.id });
    // Remove experience
    const removeIndex = profile.experience.map((item) => item.id).indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Add education
router.put(
  '/createProfile/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required and needs to be after since date').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await InternProfile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);

// Delete education
router.delete('/createProfile/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await InternProfile.findOne({ user: req.user.id });
    const removeIndex = profile.education.map((item) => item.id).indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
