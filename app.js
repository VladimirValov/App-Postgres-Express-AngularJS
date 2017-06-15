const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');
const logger = require('morgan');
const _ = require('lodash');
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//const indexRoute = require('./routes/index');
const users = require('./routes/users');
const loginRoute = require('./routes/login');

/*
const passport = require('passport');
const jwt = require('jsonwebtoken');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'jwtSecret';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);

  //
  // var user = users[_.findIndex(users, {id: jwt_payload.id})];
  //
  // if (user) {
  //   next(null, user);
  // }
  // else {
  //   next(null, false);
  // }


});

//passport.use(strategy);
*/

const app = express();

//app.use(passport.initialize());



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/', indexRoute);
app.use('/users', users);
app.use('/login', loginRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("Нет подходящих маршрутов");
});


app.listen(7000, function () {
  console.log("partyApp listening on port " + 7000 + "!")
})

module.exports = app;
