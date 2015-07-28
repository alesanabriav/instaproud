'use strict';
var base = __base;
var app = require('express')();
var getAll = require(base + 'lib/photos/get_all');
var byId = require(base + 'lib/photos/by_id');
var byStarred = require(base + 'lib/photos/by_starred');
var store = require(base + 'lib/photos/store');
var destroy = require(base + 'lib/photos/destroy');
var update = require(base + 'lib/photos/update');
var hashtagStore = require(base + 'lib/hashtags/store');
var process = require(base + 'lib/photos/process');
var starred = require(base + 'lib/photos/starred');
var resize = require(base + 'lib/photos/resize');

app.get('/api/photos', function(req, res, next) {
  var photosSkip = parseInt(req.query.photosSkip) || 0;
  var commentsSkip = parseInt(req.query.commentsSkip) || 0;

  getAll(photosSkip, commentsSkip, function(err, photos) {
    if (err) return next(err);
    return res.json(photos);
  });
});

app.post('/api/photos', function(req, res) {
  var data;
  var body = req.body;
  var user = req.user;
  var img = new Buffer(req.body.image, 'base64');

  process(img, user, function(err, src) {
    if(err) return res.status(400).json(err);

    data = {
      path: src,
      owner: user._id,
      caption: body.caption,
      geolocation: body.geolocation,
      tagged: body.tagged
    };

    store(data, function(err, photo) {
      hashtagStore(photo.caption, photo.id, function() {
        return res.status(201).json(photo);
      });
    });

  });
});

app.post('/api/photos/compress', function(req, res) {
  var path = req.files.path;
  resize(req.files.path, function(path) {

  });
});

app.get('/api/photos/starred', function(req, res) {
  byStarred(function(err, photos) {
    if(err) return res.status(400).json(err);
    return res.status(200).json(photos);
  });
});

app.get('/api/photos/:id', function(req, res, next) {
  var id = req.params.id;

  byId(id, function(err, photo) {
    if (err) return next(err);
    return res.json(photo);
  });

});

app.put('/api/photos/:id', function(req, res) {
  var photoId = req.params.id;
  var data = req.body;

  update(photoId, data, function(err, photo) {
    if (err) return res.status(400).json(err);
    return res.status(200).json(photo);
  });
});

app.delete('/api/photos/:id', function(req, res, next) {
  var photoId = req.params.id;
    destroy(photoId, function(err) {
      if (err) return next(err);
      return res.status(204).json({});
    });
});

app.post('/api/photos/:id/report', function(req, res) {
  return res.json({ok: true});
});

app.post('/api/photos/:id/starred', function(req, res) {
  var photoId = req.params.id;
  starred(photoId, function(err, photo) {
    if(err) return res.status(400).json(err);
    return res.status(200).json(photo);
  });
});


module.exports = app;
