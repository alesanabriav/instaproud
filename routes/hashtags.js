'use strict';
var app = require('express')();
var search = require(__base + 'lib/hashtags/search');
var byHashtag = require(__base + 'lib/photos/by_hashtag');
var getAll = require(__base + 'lib/hashtags/get_all');

app.get('/api/hashtags', function(req, res) {
  getAll(function(err, hashtags) {
    if(err) return res.status(400).json(err);
    return res.json(hashtags);
  });
});

app.get('/api/hashtags/:query', function(req, res) {
  var name = req.params.query;
  search(name, function(err, hashtags) {
    if (err) return res.status(400).json(err);
    return res.json(hashtags);
  });
});

app.get('/api/hashtags/:hashtag/photos', function(req, res) {
  var hashtag = '#' + req.params.hashtag;
  var photosSkip = req.query.photosSkip || 0;
  byHashtag(hashtag, function(err, photos) {
    if(err) return res.json(err);
    return res.json(photos);
  });

});
module.exports = app;