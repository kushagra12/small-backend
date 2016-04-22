var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");
var flash = require("connect-flash");
var expressSession = require("express-session");
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(expressSession);
require("./app/config/passport")(passport);

var index = require('./app/routes/index')(passport);
var users = require('./app/routes/users')(passport);
var ticket = require('./app/routes/ticket')(passport);
var auth  = require('./app/routes/auth')(passport);


var app = express();

mongoose.connect('mongodb://localhost/codeplay');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret:'mysecrerdcdsgfdgsndsjfnkjdsnfjnsdi',
  resave: false,
  saveUninitialized: true,
  store : new MongoStore({ mongooseConnection: mongoose.connection })
  }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index.router);
app.use('/', users.router);
app.use('/', auth.router);
app.use('/ticket', ticket.router);

app.set('json spaces', 4);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log("Server started");

module.exports = app;
