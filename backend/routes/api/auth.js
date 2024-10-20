const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const { check, validationResult} = require( 'express-validator' );
const jwt = require('jsonwebtoken')
const config = require('config')
const  bcryptjs = require("bcryptjs");

// GET api/auth
router.get('/',auth, async(req,res)=> {
    try {
        const user  = await User.findById(req.user.id).select('-password')
        console.log(user)
        res.json(user)
        console.log("user id",req.user.id)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
});

// POST api/auth... AUTHENTICATE USER
router.post('/',[
    
    check('email',"Please include a valid email").isEmail(),
    check('password', "PASSWORD IS REQUIRED").exists()
] , async (req, res) => {

    console.log(req.body)

    const errors = validationResult(req);
    if  (!errors.isEmpty()) return res.status(400).json({ error : errors.array() });


    const{ email, password }= req.body;

    try {
        let user = await  User.findOne({ email })

        if(!user){
           return  res.status(400).json( {errors: [{msg: "INVALID CREDENTIALS"}]} )
        }

        const   isMatch = await bcryptjs.compare(password, user.password)
        
        if(!isMatch) return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }]})

      

        //return jsonwebtoken
        const payload = {
            user:{
                id: user.id
            }

            
        }
        jwt.sign(payload, config.get("jwtPrivateKey"), {expiresIn:360000000000},
         (err, token)=>{
            if(err) throw err;
            res.json( {token, userId: user.id})
        })
        
        
    } catch (error) { 
        console.log(error);
        res.status(500).send({msg:"Server Error"});
    }
    
});


module.exports= router;