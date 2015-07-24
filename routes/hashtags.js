'use strict';
var app = require('express')();
var Hashtag = require('../models/hashtag');

app.get('/api/hashtags/:query', function(req, res) {
  var name = req.params.query;

  Hashtag
  .find({name: new RegExp(name, 'i')})
  .exec(function(err, hashtags) {
    if (err) return next(err);
    return res.json(hashtags);
  })
});

app.get('/api/hashtags/:hashtag/photos', function(req, res) {
  var hashtag = '#' + req.params.hashtag;
  var photosSkip = req.query.photosSkip || 0;

  Hashtag.findOne({name: hashtag})
  .populate({
    path: 'photos',
    match: { 'hidden': {$ne: true} },
    options: {limit: 25, skip: photosSkip}
  })
  .exec(function(err, hash) {
    if (err) return next(err);
    return res.json(hash);
  });

});

module.exports = app;