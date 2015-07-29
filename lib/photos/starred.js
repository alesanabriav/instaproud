'use strict';
var Photo = require(__base + 'models/photo');

module.exports = function starred(photoId, next) {
  Photo
  .update({starred: true}, {$set: {starred: false}}, {multi: true}, function(err) {
    if(err) return next(err);

    Photo
    .update({_id: photoId}, {$set: {starred: true}}, function(err) {
      if(err) return next(err);
      Photo
      .findOne({_id: photoId}).exec(function(err, photo) {
        if(err) return next(err);
        return next(null, photo);
      });
    });
  });
};
