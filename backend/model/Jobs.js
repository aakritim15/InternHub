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
            ref: 'user'
        },
        company:{
            type: mongoose.Schema.Types.String,
            ref: 'recruiter-profile'
        },
        Date:{
            type: Date,
            default: Date.now
        },
        applicants:[
            {
                applicant:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'inter-profile'
                },
                resume:{
                    fileId: { type: mongoose.Schema.Types.ObjectId }
                },
                status:{
                    type: String,
                    default: 'Pending',
                    enum: [
                        'Pending',
                        'Accepted',
                        'Rejected',
                    ]
                }
                
            }
        ],
        status:{
            type: String,
            enum : ['Listing', 'Closed', 'Actively Hiring'],
            default:'Listing'
        }
    })


    module.exports = JobProfile = mongoose.model('job-profile', JobsSchema)