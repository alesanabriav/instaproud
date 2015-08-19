'use strict';
require('newrelic');
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var redis = require('redis');
var RedisStore = require('connect-redis')(session);
var redisClient = redis.createClient();
var Promise = require('bluebird');
var requireAuthentication = require('./lib/checkAuth');
var io = require('socket.io')(4000);

//Global path
global.__base = __dirname + '/';
var index = require('./routes/index');
var activityStore = require('./lib/activities/store');
activityStore(io);
var app = express();

// Config files
var dbConfig =  require('./config/db.js');

//Promisify mongoose
Promise.promisifyAll(mongoose);

//Database connection
mongoose.connect(dbConfig.url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// Middlewares
app.use(compression());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(cookieParser());

//Sessions with redis Config
app.use(session({
  secret: 'InstaProud',
  store: new RedisStore({ host: 'localhost', port: 6379, client: redisClient }),
  saveUninitialized: false,
  resave: true,
  cookie: {
    httpOnly: true
  }
}));

//Passport Config
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');
app.use(express.static(path.join(__dirname, 'public')));

//Parse files
app.use(multer({
  dest: 'public/images'
}));

//Routes
app.all('/api/*', requireAuthentication);
app.use(index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return res.sendfile('./views/index.html');
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500)
    .json('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500)
  .json('error', {
    message: err.message,
    errors: {}
  });
});

app.set('x-powered-by', false);

module.exports = app;
