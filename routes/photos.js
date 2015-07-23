'use strict';
var app = require('express')();
var getAll = require(__base +'lib/photos/get_all');
var byId = require(__base +'lib/photos/by_id');
var store = require(__base +'lib/photos/store');
var destroy = require(__base +'lib/photos/destroy');
var update = require(__base +'lib/photos/update');
var hashtagStoreOrUpdate = require(__base + 'lib/hashtags/store_or_update');
var compressImage = require(__base + 'lib/photos/compress_image');
var process = require(__base + 'lib/photos/process');
var filters = require(__base + 'lib/photos/filters');

app.get('/api/photos', function(req, res, next) {
  var photosSkip = parseInt(req.query.photosSkip) || 0;
  var commentsSkip = parseInt(req.query.commentsSkip) || 0;

  getAll(photosSkip, commentsSkip, function(err, photos) {
    if (err) return next(err);
    return res.json(photos);
  });
});

app.post('/api/photos', function(req, res, next) {
  var src = req.body.src;

  var data = {
    path: src,
    owner: req.user._id
  };

  store(data, function(err, photo) {
    if (err) res.status(400).json(err);
    return res.status(201).json(photo);
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
    if (photo.caption && photo.caption !== '') {
      hashtagStoreOrUpdate(photo.caption, photo.id, function() {
        return res.status(200).json(photo);
      });
    } else {
      return res.status(200).json(photo);
    }

  });

});

app.delete('/api/photos/:id', function(req, res, next) {
  var photoId = req.params.id;
  destroy(photoId, function(err) {
    if (err) return next(err);
    return res.status(204).json({});
  });
});

app.post('/api/photos/compress', function(req, res, next) {
  var file = req.files.original_image;
  var user = req.user;

  compressImage(file, user, function(err, path) {
    if (err) return next(err);
    return res.json(path);
  });
});

app.post('/api/photos/upload', function(req, res, next) {
  var user = req.user;
  var img = new Buffer(req.body.img, 'base64');
  process(img, user, function(err, name) {
    if(err) return next(err);
    res.json({'original': name});
  });
});

app.post('/api/photos/filter', function(req, res, next) {
  var path = './public/' + req.body.src;
  var imageName = req.body.src.split('/')[2];
  var filter = req.body.filter;
  var user = req.user;

  filters(path, imageName, filter, user, function(photo) {
    return res.json({photo: photo});
  });

});

module.exports = app;
