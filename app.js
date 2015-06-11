//Dependencies
var fs = require('fs');
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
var Promise = require('bluebird');

//Routes
var authentication = require('./routes/authentication');
var index = require('./routes/index');
var users = require('./routes/users');
var photos = require('./routes/photos');
var photoTagged = require('./routes/photo_tagged');
var photoComments = require('./routes/photo_comments');
var photoLikes = require('./routes/photo_likes');
var hashtags = require('./routes/hashtags');
var activities = require('./routes/activities');


//Promisify mongoose
Promise.promisifyAll(mongoose);


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
// app.use(index);
// app.use(authentication);
// app.use(users);
// app.use(photos);
// app.use(photoTagged);
// app.use(photoComments);
// app.use(photoLikes);
// app.use(hashtags);
// app.use(activities);

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
    res.status(err.status || 500)
    .json('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .json('error', {
    message: err.message,
    errors: err
  });
});

module.exports = app;