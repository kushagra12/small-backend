var express = require('express');
var router = express.Router();
var mail_send = require("../util/email.js");

module.exports = function(passport){
    router.get('/', function(req, res, next) {
        var error = req.flash("err");
        var message = req.flash("msg");
        
        console.log(error);
        console.log(message);
        res.render('index',{err : error , suc : message});
    });
    router.get('/communities',function(req, res, next){
      res.render('problem_statements');
    });

    router.post("/doubt", function(req,res,next){
      var name = req.body.name || "";
      var msg = req.body.msg || "";
      var email = req.body.email || "";

      if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)){
        req.flash("err","Invalid Email");
        return res.redirect("/");
      }

      if(!(/^[a-z0-9\s\.\n\r\t:()_,?]*$/i).test(msg)){
        req.flash("err","Invalid message. It should not contain special characters");
        return res.redirect("/");
      }

      mail_send.sendMsg(name,email,msg);
      req.flash("msg","Message send. We will get back to you within 24 hours.");

      res.redirect("/");
    });
  return module.exports;
}



module.exports.router = router;
