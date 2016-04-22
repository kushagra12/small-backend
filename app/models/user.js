var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    authType : String,
    name : String,
    regNo : String,
    email : String,
    profilePicUrl : String,

    phone : String,
    teamMembers : {type:Number},
    skills : String,

    profileFilled : {type:Boolean,default:false},
    google           : {
        id           : String,
        token        : String
    },
    community : String,
    project_idea : String,
    registered : {type:Boolean,default:false}
});
module.exports = mongoose.model('User', userSchema);
