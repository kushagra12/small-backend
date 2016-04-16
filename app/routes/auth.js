var express = require('express');
var router = express.Router();

module.exports = function(passport){

    router.get("/register",function(req,res){
        //res.render('register');
        res.redirect("/auth/google");
    });

    router.get("/login",function(req,res){
        //res.render('login');
        res.redirect("/auth/google");
    });

    router.get("/logout",function(req,res){
        req.logout();
        res.redirect('/');
    });

    router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    router.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/',
            failureFlash : true
        })
    );

    return module.exports;
}

module.exports.router = router;
