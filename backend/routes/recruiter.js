const express = require('express')
const auth = require('../middleware/auth');
const RecruiterProfile = require('../model/profile/Recruiter');

const JobProfile  = require('../model/Jobs')
const { profile, error } = require('console');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const { send } = require('process');


//make profile recruiter
router.post ('/', [auth,
    [
        check('company', 'Company is required').not().isEmpty(),
        
    ]
], async(req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { company, website, location, description, youtube, twitter, instagram, linkedin } = req.body;

            //build profile object

            const profileFields = {}
            profileFields.user = req.user.id;
            profileFields.company = req.body.company;
            
            if(website)  profileFields.website = website;
            if(location) profileFields.location = location;
            if(description) profileFields.bio = bio;
           
            
            
        
         
            //social object
            profileFields.social = {}
            if(youtube) profileFields.social.youtube = youtube
            if(twitter) profileFields.social.twitter= twitter
            if(instagram) profileFields.social.instagram =  instagram
            if(linkedin) profileFields.social.linkedin = linkedin
            
            try {
                let profile =  await RecruiterProfile.findOne({user: req.user.id})
        
                if(profile){
                    //update
                    profile = await RecruiterProfile.findOneAndUpdate(
                        {user: req.user.id} ,
                         {$set:profileFields} ,
                         {new: true});
                    
                    return res.json(profile);
                }
        
                //create
                profile = new RecruiterProfile(profileFields)
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
        const profiles = await RecruiterProfile.find().populate('user')
        res.json(profiles)
    } catch (error) {

        console.error(error.message)
        res.status(500).send("Server error")
        
    }
})

//add job posting


router.post('/post', [
    auth,
    [
        check('salary', 'Salary is required').not().isEmpty(),
        check('jobTitle', 'Job Title is required').not().isEmpty(),
        check('location', 'Location is required').not().isEmpty(),
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { salary, title, location, description } = req.body;

    const jobFields = {};
    jobFields.user = req.user.id; // Link job to the logged-in user
    jobFields.salary = salary;
    jobFields.title = title;
    jobFields.location = location;
    if (description) jobFields.description = description;

    try {
        // Find the recruiter's profile based on the logged-in user
        let recruiterProfile = await RecruiterProfile.findOne({ user: req.user.id });
        
        if (!recruiterProfile) {
            return res.status(400).json({ msg: 'Recruiter profile not found' });
        }

        // Automatically set the company ID from the recruiter profile
        jobFields.company = recruiterProfile.company;

        
            // Create new job
            job = new JobProfile(jobFields);
            await job.save();
        

        res.json(job);
        console.log(job)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

    

module.exports = router;