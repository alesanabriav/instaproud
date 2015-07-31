'use strict';
var base = __base;
var Comment = require(base + 'models/comment');
var hashtagStore = require(base + 'lib/hashtags/store');
var photoUpdateArray = require(base + 'lib/photos/update_array');

module.exports = function store(commentText, photoId, userId, next) {
  var newComment = new Comment({commenter: userId, text: commentText});

  newComment.save(function(err, commentStored){
    if(err) return next(err);

    photoUpdateArray(photoId, {comments: commentStored.id}, function(err) {
      if(err) return next(err);

      hashtagStore(commentStored.text, photoId, function(err) {
        if(err) return next(err);
         return next(null, commentStored);
      });
    });
  });
};
