'use strict';
var app = require('express')();
var getAll = require(__base +'lib/photos/get_all');
var byId = require(__base +'lib/photos/by_id');
var store = require(__base +'lib/photos/store');
var destroy = require(__base +'lib/photos/destroy');
var update = require(__base +'lib/photos/update');
var hashtagStoreOrUpdate = require(__base + 'lib/hashtags/store_or_update');
var process = require(__base + 'lib/photos/process');

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
  console.log(body.geolocation);
  process(img, user, function(err, src) {
    if(err) return res.status(400).json(err);

    data = {
      path: src,
      owner: user._id,
      caption: body.caption,
      geolocation: JSON.parse(body.geolocation),
      tagged: JSON.parse(body.tagged)
    };

    store(data, function(err, photo) {
      if (err) res.status(400).json(err);
      return res.status(201).json(photo);
    });
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

app.post('/api/photos/upload', function(req, res, next) {
  var user = req.user;
  var img = new Buffer(req.body.img, 'base64');
  process(img, user, function(err, name) {
    if(err) return next(err);
    res.json({'original': name});
  });
});

module.exports = app;
