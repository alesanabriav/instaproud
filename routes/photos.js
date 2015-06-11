"use strict";
var app = require('express')();
var Promise = require('bluebird');
var async = require('async');
var fs = require('fs-extra');
var sharp = require('sharp');

var CreateName = require('../lib/createName');
var hashtagStoreOrUpdate = require('../lib/hashtag_store_or_update');
var filters = require('../lib/photo_filters');

var User = require('../models/user');
var Photo = require('../models/photo');
var Hashtag = require('../models/hashtag');

//promisify
Promise.promisifyAll(fs);
Promise.promisifyAll(sharp);

/**
 * create random name for image and stored on uploads
 * @param  req  get request data
 * @param  res
 * @return object
 */

app.route('/api/photos')

  /**
   * Store path to photo
   * @param  req
   * @param  res
   * @return json object
   */
  .post(function(req, res, next) {
    var src = req.body.src;
    var newPhoto = new Photo({
      path: src,
      owner: req.user._id
    });

    newPhoto.saveAsync()
    .spread(function(photo) {
      return res.status(201).json(photo);
    })
    .catch(function(err) {
      return res.status(400).json(err);
    })

  })

  /**
   * Get all photos with his relationships
   * @param  req
   * @param  res
   * @return object json with all photos
   */
  .get(function(req, res, next) {
    var commentsSkip = parseInt(req.query.commentsSkip) || 0;
    var photosSkip = parseInt(req.query.photosSkip) || 0;

    Photo.find({}, null, {limit: 5, skip: photosSkip})
    .sort({created: 'desc'})
    .populate(['owner', 'liked'])
    .populate({
      path: 'comments',
      options: {
        sort: {created: 'desc'},
        limit: 5,
        skip: commentsSkip
      }
    })
    .execAsync()
    .then(function(photos) {

      return Photo
      .populate(photos, {
        path: 'comments.commenter',
        model: 'User'
      })

    })
    .then(function(photos) {
      return res.json(photos);
    })
    .catch(function(err) {
      return next(err);
    });

  });

/**
 * add to image caman filter
 * @param  req  get request data
 * @param  res
 * @return json object
 */
app.post('/api/photos/filter', function(req, res, next) {

  var path = "./public"+ req.body.src;
  var imageName = req.body.src.split('/')[3];
  var filter = req.body.filter;
  var user = req.user;

  filters(path, imageName, filter, user, function(photo) {
    return res.json({photo: photo});
  });

});

app.post('/api/photos/upload', function(req, res, next) {
    var user_id = req.user._id;
    var img = new Buffer(req.body.img ,'base64');
    var name;
    var path;
    var folder;

    CreateName(user_id, function(err, hash) {
      if (err) return next(err);

      name = user_id+"_"+hash + ".jpeg";
      folder = "./public/images/" + user_id;
      path = folder+"/"+ name;

      fs.mkdirsAsync(folder)
      .then(function () {
        return sharp(img)
        .quality(75)
        .toFile(path);
      })
      .then(function() {
         res.json({"original": name});
      })
      .catch(function(err) {
        return next(err);
      });

    });

  })

app.route('/api/photos/:id')
  .get(function(req, res, next) {

    Photo
    .findById(req.params.id)
    .populate([
      'liked',
      'owner',
      'tagged',
      'comments'
      ])
    .execAsync()
    .then(function(photos) {
      return Photo.populate(photos, {
        path: 'comments.commenter',
        model: 'User'
      });
    })
    .then(function(photos) {
      return res.json(photos);
    })
    .catch(function(err) {
      return next(err);
    })

  })

  .put(function(req, res, next) {
    var photoId = req.params.id;
    var body = req.body;
    var query = {_id: photoId};
    var data = {caption: body.caption};
    var options = {new: true};
    var caption = body.caption;
    var hashtagData;

    Photo.findOneAndUpdateAsync(query, data, options)
    .then(function(photo) {

      hashtagStoreOrUpdate(caption, photo._id, function() {
        return res.status(200).json(photo);
      });

    })
    .catch(function(err) {
      return next(err);
    });

  });

module.exports = app;