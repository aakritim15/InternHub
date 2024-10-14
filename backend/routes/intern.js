const express = require('express');
const auth = require('../middleware/auth');
const InternProfile = require('../model/profile/Intern');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const config = require('config');
const router = express.Router();


//make profile intern
router.post ('/', [auth,
    [
        check('skills', 'Skills is required').not().isEmpty(),
        
    ]
], async(req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {
        website,
        location,
        description,
        skills, 
        githubusername,
        youtube,
        twitter,        
        instagram,
        linkedin,
        } = req.body;

            //build profile object

            const profileFields = {}
            profileFields.user = req.user.id;
            
            if(website)  profileFields.website = website;
            if(location) profileFields.location = location;
            if(description) profileFields.bio = bio;
           
            if(githubusername) profileFields.githubusername = githubusername
            if (typeof skills === 'string') {
                profileFields.skills= skills.split(',').map(skill=>skill.trim())
            }
            
        
            console.log(profileFields.skills)
        
            //social object
            profileFields.social = {}
            if(youtube) profileFields.social.youtube = youtube
            if(twitter) profileFields.social.twitter= twitter
            if(instagram) profileFields.social.instagram =  instagram
            if(linkedin) profileFields.social.linkedin = linkedin
            
            try {
                let profile =  await InternProfile.findOne({user: req.user.id})
        
                if(profile){
                    //update
                    profile = await InternProfile.findOneAndUpdate({user: req.user.id} ,
                         {$set:profileFields} ,
                         {new: true});
                    
                    return res.json(profile);
                }
        
                //create
                profile = new InternProfile(profileFields)
                await profile.save()
                return res.json(profile)
            } catch (error) {
                console.error(error.message)
                res.status(500).send('Server error')
            }
            res.send(profileFields)

    

})
//get all profiles
router.get('/', async (req,res)=>{
    try {
        const profiles = await InternProfile.find().populate('user')
        res.json(profiles)
    } catch (error) {

        console.error(error.message)
        res.status(500).send("Server error")
        
    }
})

//update experience
router.put("/experience", [auth,[
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required and needs to be from the past')
    .not().isEmpty()
]], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }


    const{
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await InternProfile.findOne({user: req.user.id});
        console.log("this is the profile: ", profile);
        profile.experience.unshift(newExp)
        await profile.save();
        res.json(profile)

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
        
    }
})

//delete experiences
router.delete('/experience/:exp_id', auth ,async (req,res)=>{
    try {
        const profile =  await InternProfile.findOne({user: req.user.id});
        //remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)  
        profile.experience.splice(removeIndex, 1);
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }
    
    console.log(profile)

})

//add education

router.put('/education', [auth,
    [
        check('school','School is required').not().isEmpty(),
        check('degree','Degree is required').not().isEmpty(),
        check('fieldofstudy','Field of study is required').not().isEmpty(),
        check('from','From date is required and needs to be after SINCE date').not().isEmpty(),
    ]], async(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const{
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }= req.body;
    
    
        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }
    
        try {
            const profile  = await InternProfile.findOne({ user : req.user.id });
            console.log(profile)
    
    
            profile.education.unshift(newEdu)
            await profile.save()
            res.json(profile);
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error")
        }
        
    
    
    })
    
    //delete educaion
    
    router.delete('/education/:edu_id', auth, async(req,res)=>{
        try {
            const profile  = await InternProfile.findOne({ user: req.user.id});
    
            const removeIndex = profile.education.map(item => item.id).indexOf(req.params.exp_id)  
            profile.education.splice(removeIndex, 1);
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error")
        }
    })
    
// Mongo URI
const mongoURI = config.get('mongoURI');

// Initialize GridFS
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// GridFS Storage engine for file uploads
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: 'uploads' // Files will be stored in the 'uploads' collection
    };
  }
});

// Set up multer for file upload
const upload = multer({ storage });

// PUT route to upload resume and update the intern profile
router.put('/upload-resume', [auth, upload.single('resume')], async (req, res) => {
  try {
    // Find the profile for the logged-in user
    let profile = await InternProfile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // Add resume file metadata to the profile
    profile.resume = {
      filename: req.file.filename,
      fileId: req.file.id,
      contentType: req.file.contentType,
      uploadDate: req.file.uploadDate
    };

    // Save the profile with the updated resume
    await profile.save();

    res.json({ msg: 'Resume uploaded successfully', profile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


module.exports = router;