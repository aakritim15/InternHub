const express = require('express')
const auth = require('../middleware/auth');
const InternProfile = require('../model/profile/Intern');
const { profile, error } = require('console');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const { send } = require('process');
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


module.exports = router;