var Team = require('./models/team');

module.exports.isLoggedIn = function(req,res,next){
  if(req.user){
    res.locals.user = req.user;
    next();
  }else{
    res.redirect("/login");
  }
}

module.exports.teamMember = function(req,res,next){
  if(req.team){
    return next();
  }
  Team.findOne({members : req.user},function(err,team){
    if(err){
      return res.sendStatus(500);
    }
    req.team = team;
    next();
  })
}

module.exports.isTeamMember = function(req,res,next){
  if(req.team){
    next();
  }else{
    res.redirect('/createJoin');
  }
}
