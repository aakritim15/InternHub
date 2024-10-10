const mongoose = require('mongoose');
const {type} = require('os');


const ProfileSchema =  new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company:{
        type: String
    },
    website:{
        type: String
    },
    location:{
        type:String 
    },
    description:{
        type:String
    },
     social:{
        youtube:{
            type: String
        },
        twitter:{
            type: String
        },
        facebook:{
            type: String
        },

        linkedin:{
            type: String
        },
        instagram:{
            type: String
        },
    },
    date:{
        type: Date,
        default: Date.now
    }
})


module.exports = RecruiterProfile = mongoose.model('recruiter-profile', ProfileSchema)