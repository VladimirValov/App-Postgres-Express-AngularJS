const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');
const logger = require('morgan');
//const _ = require('lodash');
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const authRequire = require('./middleware/authRequire');

//const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');
const loginRoute = require('./routes/login');
const gamesRoute = require('./routes/games');
const scoresRoute = require('./routes/scores');
const reportsRoute = require('./routes/reports');


const app = express();

//app.use(passport.initialize());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/', indexRoute);
app.use('/users', /*authRequire,*/ usersRoute);
app.use('/login', loginRoute);
app.use('/games', /*authRequire,*/ gamesRoute);
app.use('/scores', /*authRequire,*/ scoresRoute);
app.use('/reports',/*authRequire,*/  reportsRoute);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 403);
  res.send(err.message);
});


app.listen(7000, function () {
  console.log("partyApp listening on port " + 7000 + "!")
})

module.exports = app;
