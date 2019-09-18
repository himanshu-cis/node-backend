require('./globals');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const config = require('./config');
const { MongoManager } = require('./src/mongo');
const api = require('./src/routes/api');
const app = express();
const logger = require('morgan');
const mongoManager = new MongoManager(config);
const passport = require('passport');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
mongoManager.connect();

app.use(passport.initialize());
app.use(logger('dev'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api', api);
/* For non registered route */
app.use('/', function (req, res, next) {
  res.statusCode = 200;
  res.json({
    status: "success",
    message: "Route not registered",
    data: {}
  })
});

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   // console.log("-----1111--------------TCL: req.app.get('env')", req.app.get('env'))

//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   ReE(res, err, 422)
// });

module.exports = app;
