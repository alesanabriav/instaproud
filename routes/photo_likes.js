//Dependencies
var app = require('express')();

//Models
var User = require('../models/user');
var Photo = require('../models/photo');

app.post('/api/photos/:id/liked', function(req, res, next) {
  var id = req.params.id;
  var userId = req.user._id;

  Photo.findOneAndUpdate({_id: id}, {$addToSet: {liked: userId} }, function(err, photo) {

    Photo
    .findOne({_id: photo._id})
    .populate(['owner', 'liked'])
    .exec(function(err, photos) {
      if (err) return next(err);
      return res.json(photos);
    });

  });
});

app.post('/api/photos/:id/unliked', function(req, res) {
  var id = req.params.id;
  var userId = req.user._id;

  Photo.findOneAndUpdate({_id: id}, {$pull: {liked: userId} }, function(err, photo) {
    Photo.findOne({_id: photo._id}).populate(['owner', 'liked']).exec(function(err, photos) {
    if (err) return next(err);
      return res.json(photos);
    });
  });
});

module.exports = app;