var express = require('express');
var router = express.Router();
var User = require("../models/user.js");


module.exports = function(passport){
    router.post('/', function(req, res, next) {
        var response_attendance = {};
        var authId = req.body.req_id;
        var reg_no = req.body.reg_no || "";
        
        console.log(reg_no);
        
        if(authId != "myDirtyLittleSecreeet"){
            res.status(403);
            res.send("Forbidden");
        }
        else{
            User.findOne({regNo : reg_no}, function(err, user){
                if(err){
                    response_attendance.status_code = 4;
                }
                else if(!user){
                    response_attendance.status_code = 0;
                }
                else if(user.registered == true){
                    response_attendance.user_info = user;
                    response_attendance.status_code = 2;
                }
                else{
                    response_attendance.user_info = user;
                    response_attendance.status_code = 1;
                    user.registered = true;
                    process.nextTick(function(){
                        user.save();
                    });
                }
                res.json(response_attendance); 
            });
        }
    });
    
  return module.exports;
}



module.exports.router = router;