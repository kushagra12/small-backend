var express = require('express');
var router = express.Router();
var User = require('../models/user');
var ic = require("../interceptor.js");
var Team = require("../models/team");

module.exports = function(passport){
  // router.get('/users', function(req, res, next) {
  //   User.find({},function(err,users){
  //     return res.json(users);
  //   });
  // });

  // router.get('/createJoin',ic.isLoggedIn,function(req,res,next){
  //   if(req.team){
  //     return res.redirect('/dashboard');
  //   }
  //   res.locals.err = req.flash("err");
  //   res.render('createJoin');
  // });

  // router.get('/dashboard',ic.isLoggedIn,ic.teamMember,ic.isTeamMember ,function(req,res,next){
  //   res.render("dashboard");
  // });

  router.post('/creatdfdfsfsdfsvdgfsdgbhsbfavfasdgdsfgsdfsdrerewtynhfdfgsdfsfbsdbsbeTeam',ic.isLoggedIn,ic.teamMember,function(req,res,next){
    if(req.team){
      return res.send("already a member");
    }
    var name = req.body.name;
    var type = req.body.type || "";
    var desc = req.body.description || "";
    console.log(req.body);
    if(name==undefined || type==undefined || desc==undefined)return res.sendStatus(500);
    if(!(/^[a-z0-9 ]{4,}$/i).test(name)){
      req.flash("err","Name should be at least 5 characters long and can contain letters , numbers and spaces only.");
      return res.redirect("/createJoin");
    }
    if(false){               //dont forget to check for type
      res.send("Invalid type");
    }
    if(!(/^[a-z0-9 ]*$/i).test(desc)){
      req.flash("err","Description can contain letters , numbers and spaces only.");
      return res.redirect("/createJoin");
    }
    Team.findOne({name : name} , function(err,team){
      if(err)return res.sendStatus(500);
      if(team){
        req.flash("err","Team name not available.");
        return res.redirect("/createJoin");
      }
      var t = new Team();
      t.name = name;
      t.type = type;
      t.description = desc;
      t.leader = req.user.id;
      t.members.push(req.user.id);
      t.save(function(err){
        if(err)return res.sendStatus(500);
        return res.redirect("/dashboard");
      });
    });
  });

  router.get('/profile',ic.isLoggedIn,function(req,res){
    var error = req.flash('err');
    res.render('profile', {err : error});
  });

  router.post('/updateProfile',ic.isLoggedIn,function(req,res){
    var phone = req.body.phone || "";
    var tm = req.body.teamMembers || "";
    var skills = req.body.skills || "";
    var regNo = req.body.regNo.toUpperCase() || "";
    var name = req.body.name || "";
    var comm = req.body.community || "";
    var email = req.body.email || "";
    var idea = req.body.idea || "";

    if(!(/^[0-9]{9,13}$/i).test(phone)){
      req.flash("err","Invalid Phone number");
      return res.redirect("/profile");
    }
    if(!(/^0*[0-5]$/i).test(tm)){
      req.flash("err","Invalid team Members count");
      return res.redirect("/profile");
    }
    if(!(/^[a-z0-9\s\.\n\r\t:()_,?]*$/i).test(skills)){
      req.flash("err","Invalid skills. It should not contain special characters");
      return res.redirect("/profile");
    }

    if(!(/^1[2-5][A-Z]{3}[0-2][0-9]{3}$/).test(regNo)){
        req.flash("err","Invalid Registration Number");
        return res.redirect("/profile");
    }

    if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)){
      req.flash("err","Invalid Email");
      return res.redirect("/profile");
    }

    req.user.community = comm;
    req.user.project_idea = idea;
    req.user.name = name;
    req.user.email = email;
    req.user.regNo = regNo;
    req.user.profileFilled = true;
    req.user.phone = phone;
    req.user.teamMembers = parseInt(tm);
    req.user.skills = skills;
    req.user.save(function(err){
      if(err)return res.sendStatus(500);
      req.flash("msg","Profile successfully updated");
      return res.redirect("/");
    });
  });

  return module.exports;
}

module.exports.router = router;
