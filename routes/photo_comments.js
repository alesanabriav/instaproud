'use strict';
var app = require('express')();
var xssFilters = require('xss-filters');
var hashtagStoreOrUpdate = require('../lib/hashtags/store_or_update');
var Photo = require('../models/photo');
var Comment = require('../models/comment');

app.route('/api/photos/:id/comments')

.post(function(req, res, next) {
  var commentText = xssFilters.inHTMLData(req.body.comment);
  var photoId = req.params.id;

  var newComment = new Comment({
    text: commentText,
    commenter: req.user._id
  });

  newComment.saveAsync()
  .spread(function(comment) {
    Photo.findOneAndUpdate(
      {_id: photoId},
      {$addToSet: {
        comments: comment._id
      }
    })
    .exec(function(err, photo) {
      if(err) return next(err);

      Comment.findOne({_id: comment._id})
      .populate('commenter', 'username')
      .exec(function(err, commt) {
        if(err) return next(err);

        hashtagStoreOrUpdate(commentText, photo._id, function() {
          return res.status(201).json(commt);
        });

      });

    });
  })
  .catch(function(err) {
    return next(err);
  });
});

module.exports = app;
