//Dependencies
var app = require('express')();

//Models
var User = require('../models/user');
var Photo = require('../models/photo');

app.post('/api/photos/:id/like', function() {
   var id = req.params.id;
  var userId = req.body.tagged;

  Photo.findOne({_id: id}, function(err, photo) {
    if (err) throw err;

    photo.update({$addToSet: {tagged: userId} }, function(err) {
      if (err) throw err;

      User.findOne({_id: userId}, function(err, o) {
        if (err) throw err;

        return res.json(o);
      });

    });
  });
});

app.post('/api/photos/:id/liked', function(req, res) {
  var id = req.params.id;
  var userId = req.user._id;

  Photo.findOneAndUpdate({_id: id}, {$addToSet: {liked: userId} }, function(err, photo) {

    Photo
    .findOne({_id: photo._id})
    .populate(['owner', 'liked'])
    .exec(function(err, photos) {
      if (err) throw(err);
      return res.json(photos);
    });
    
  });
});

app.post('/api/photos/:id/unliked', function(req, res) {
  var id = req.params.id;
  var userId = req.user._id;

  Photo.findOneAndUpdate({_id: id}, {$pull: {liked: userId} }, function(err, photo) {
    Photo.findOne({_id: photo._id}).populate(['owner', 'liked']).exec(function(err, photos) {
    if (err) throw(err);
      return res.json(photos);
    });
  });
});

module.exports = app;