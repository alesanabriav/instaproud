'use strict';
var app = require('express')();
var Photo = require('../models/photo');
var updateArray = require(__base + 'lib/photos/update_array');

app.post('/api/photos/:id/tagged', function(req, res) {
  var id = req.params.id;
  var tagged = req.body.tagged;
  var data = {tagged: tagged};
  updateArray(id, data, function(err, photo) {
    if (err) return res.status(400).json(err);
    return res.status(201).json(photo);
  });
});

app.post('/api/photos/:id/untagged', function(req, res, next) {
  var id = req.params.id;
  var tagged = req.body.tagged;

   Photo.findOneAndUpdate({_id: id}, {$pull: {tagged: tagged} }, function(err, photo) {
     if (err) return next(err);

    Photo
    .findOne({_id: photo._id})
    .populate(['owner', 'tagged'])
    .exec(function(err, photoUpdated) {
      if (err) return next(err);
      return res.json(photoUpdated);
    });

  });
});

module.exports = app;
