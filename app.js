var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
console.log(process.env)

var indexRouter = require('./routes/index');
var sentencesRouter = require('./routes/sentences');
var sentencesApiRouter = require('./routes/api/sentences');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sentences', sentencesRouter);
app.use('/api/sentences', sentencesApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('404 error', req.url);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  console.error(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
