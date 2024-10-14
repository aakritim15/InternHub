const mongoose = require('mongoose');



const ApplySchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inter-profile'
    },
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recruiter-profile'
    },
    company:{
        type: mongoose.Schema.Types.String,
        ref: 'job-profile'
    },
    status:{
        type:String,
        default:'pending'
    },
    message:{
        type:String,
        default:''
    },
    resume:{
        type:mongoose.Schema.Types.ObjectId,
        default:'',
        ref: 'User'
    },
})


module.exports = Application = mongoose.model('Application', ApplySchema)