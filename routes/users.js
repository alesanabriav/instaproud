'use strict';
var app = require('express')();
var User = require('../models/user');
var photosByOwner = require('../lib/photos/by_owner');
var photosByTagged = require('../lib/photos/by_tagged');
var generateHash = require('../lib/createName');

var processProfileImage = require('../lib/users/process_profile_image');
var addProfileImage = require('../lib/users/add_profile_image');
var uploadToS3 = require('../lib/photos/upload_to_S3');

app.route('/users')

  .post(function(req, res, next) {
    var data = req.body;
    var newUser = new User(data);

    newUser.save( function(err, user) {
      if (err) {
        if (err.errors) {
          return res.status(400).json(err.errors);
        }
        return res.status(400).json({ user: {'message': 'El usuario ya existe'} });
      }

      req.login(user, function(err) {
        if (err) { return next(err); }
        return res.json(user);
      });

    });
  });

app.route('/users/:id')

  .get(function(req, res) {
    User.findById(req.params.id, 'username name email profile_image role', function(err, user) {
      if(err) res.status(400).json(err);
      res.json(user);
    });
  })

  .put(function(req, res) {
    var data = req.body;
    var id = req.params.id;

    User.update({_id: id}, data, { runValidators: true }, function(err, user) {
      if(err) return res.status(400).json(err);

      User.findOne({_id: id}, function(err, userUpadated){
        if (err) return next(err);
        return res.json(userUpadated);
      });

    });
  });

app.post('/users/:id/image', function(req, res, next) {
  var userId = req.user._id;
  var image = req.files.profile_image.path;
  var time = Date.now();
  var name;
  var folder;
  var path;

  generateHash(userId, function(err, hash) {
    if (err) return next(err);

    name = hash + '_' + time + '_profile.jpeg';
    folder = './public/images/' + userId;
    path = folder + '/' + name;

    //processImage
    processProfileImage(image, folder, path, function(err) {
      if (err) return next(err);

      //add Profile image
      addProfileImage(userId, name, function(err, user) {
        if (err) return next(err);

        //find one
        User.findOne({_id: user.id}, function(err, userUpadated) {
          if (err) return next(err);

          //upload to s3
          uploadToS3(name, req.user._id, function(err, data) {
            if (err) return next(err);

            return res.json(userUpadated);
          });
        });
      });
    });
  });
});

app.get('/users/search/:query', function(req, res) {
  var query = req.params.query;

  User.find({$or: [
    {username: new RegExp(query, 'i')},
    {name: new RegExp(query, 'i')}
  ]}, 'name username')
  .exec(function(err, users) {
    if (err) throw err;
    return res.json(users);
  });
});

app.get('/api/users/:username/photos', function(req, res, next) {
  var username = req.params.username;
  var photosSkip = parseInt(req.query.photosSkip);

  User.findOne({username: username})
  .exec(function(err, user) {
    if (err) return res.status(400).json({message: 'No existe'});

    photosByOwner(user, photosSkip, function(err, data) {
      if (err) return next(err);
      return res.json(data);
    });

  });
});

app.get('/api/users/:username/tagged', function(req, res, next) {
  var username = req.params.username;
  var photosSkip = parseInt(req.query.photosSkip) || 0;
  var data;

  User.findOne({username: username}, function(err, user) {
    if (err) return res.status(400).json({message: 'No existe'});

    photosByTagged(user, photosSkip, function(err, data) {
      if (err) return next(err);
      return res.json(data);
    });
  });

});

app.get('/users/me/logged', function(req, res){
  return res.json(req.user);
});

module.exports = app;
