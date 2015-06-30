'use strict';
var Photo = require(__base + 'models/photo');
var hashtagStoreOrUpdate = require(__base + 'lib/hashtags/store_or_update');

module.exports = function(photoId, data, caption, next) {

  Photo.findOneAndUpdateAsync({_id: photoId}, data, {new: true})
    .then(function(photo) {

      hashtagStoreOrUpdate(caption, photo._id, function() {
        return next(null, photo);
      });

    })
    .catch(function(err) {
      return next(err);
    });

}