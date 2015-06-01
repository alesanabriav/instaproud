//Dependencies
var express = require('express');
var router = express.Router();
var passport = require('passport');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var redisClient = redis.createClient();

//Routes
var index = require('./routes/index');
var users = require('./routes/users');
var photos = require('./routes/photos');
var authentication = require('./routes/authentication');
var hashtags = require('./routes/hashtags');

var app = express();

// Config files
var dbConfig =  require('./config/db.js');

//Database connection
mongoose.connect(dbConfig.url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middlewares
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(cookieParser());

//Sessions with redis Config
app.use(session({
  secret: 'InstaProud',
  store: new redisStore({ host: 'localhost', port: 6379, client: redisClient }),
  saveUninitialized: false, 
  resave: true
}));

//Passport Config
app.use(passport.initialize());
app.use(passport.session());

var passportConfig = require('./config/passport');

app.use(express.static(path.join(__dirname, 'public')));

//Parse files
app.use(multer({
  dest: 'public/images'
}));

//Routes
app.get('/register', function(req, res) {
  console.log(res);
  res.render('register');
});

app.use(index);
app.use(authentication);
app.use(users);
app.use(photos);
app.use(hashtags);

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

module.exports = app;