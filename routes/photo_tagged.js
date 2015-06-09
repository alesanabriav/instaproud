//Dependencies
var app = require('express')();

//Models
var User = require('../models/user');
var Photo = require('../models/photo');


app.post('/api/photos/:id/tagged', function(req, res) {
  var id = req.params.id;
  var tagged = req.body.tagged;

  Photo.findOneAndUpdate({_id: id}, {$addToSet: {tagged: tagged} }, function(err, photo) {
     if (err) throw err;
    Photo
    .findOne({_id: photo._id})
    .populate(['owner', 'tagged'])
    .exec(function(err, photoUpdated) {
      if (err) throw err;
      return res.json(photoUpdated);
    });

  });
});

app.post('/api/photos/:id/untagged', function(req, res) {
  var id = req.params.id;
  var tagged = req.body.tagged;

   Photo.findOneAndUpdate({_id: id}, {$pull: {tagged: tagged} }, function(err, photo) {
     if (err) throw err;

    Photo
    .findOne({_id: photo._id})
    .populate(['owner', 'tagged'])
    .exec(function(err, photoUpdated) {
      if (err) throw err;
      return res.json(photoUpdated);
    });

  });
});

module.exports = app;