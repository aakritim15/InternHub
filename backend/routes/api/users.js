const express = require('express')
const router = express.Router();
const { check, validationResult} = require( 'express-validator' );

const User = require('../../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')



// POST api/users... REGISTER USER
router.post('/',[
    check('name', "Name is required").not().isEmpty(),
    check('email',"Please include a valid email").isEmail(),
    check('password', "Please enter a valid password").isLength({min: 8})
] , async (req, res) => {
    
    console.log(req.body)

    const errors = validationResult(req);
    if  (!errors.isEmpty()) return res.status(400).json({ error : errors.array() });


    const{name, email, password }= req.body;

    try {
        let user = await  User.findOne({ email })

        if(user){
           return  res.status(400).json( {errors: [{msg: " User already exists"}]} )
        }

       
        user = new User({
            name, email , password
        })
        //bcrypt
        const salt = await bcrypt.genSalt(10)
        user.password =await bcrypt.hash(password,salt)

        await user.save();

        //return jsonwebtoken
        const payload = {
            user:{
                id: user.id
            }

            
        }
        jwt.sign(payload, config.get("jwtPrivateKey"), {expiresIn:360000000000},
         (err, token)=>{
            if(err) throw err;
            res.json( {token})
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send({msg:"Server Error"});
    }
    
});


module.exports= router;