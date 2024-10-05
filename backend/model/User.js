const mongoose = require('mongoose');
const { type } = require('os');
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    role: { 
        type: String,
        enum: ['intern', 'recruiter'], 
        required: true 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now
    }
})


module.exports = User = mongoose.model('user', UserSchema)