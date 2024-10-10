const mongoose = require('mongoose');
const {type} = require('os');
const User = require('./User');
const Recruiter = require('./profile/Recruiter')


const JobsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        
    },
    location: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    company:{
        type: mongoose.Schema.Types.String,
        ref: 'Recruiter'
    },
    Data:{
        type: Date,
        default: Date.now
    }
})


module.exports = JobProfile = mongoose.model('job-profile', JobsSchema)