'use strict';
var Hashtag = require(__base + '/models/hashtag');
var photoUpdateArray = require(__base + 'lib/photos/update_array');
var storeOrUpdate = require(__base + 'lib/comments/store_or_update');

/**
 * for each hashtag execute storeOrUpdate
 * if the foreach is complete execute callback
 * @param  {array}   text    array of hashtags
 * @param  {hash}   photoId  reference to photo
 * @param  {Function} next   callback
 * @return {Function} next   callback
 */
module.exports = function init(text, photoId, next) {
  var hashtags = text.match(/\#\w+\b/gm);

  if (hashtags instanceof Array && hashtags.length > 0) {
    hashtags.forEach(function(name, i) {

      storeOrUpdate(name, function(err, hashtag) {
        if(err) return next(err);

        photoUpdateArray(photoId, {hashtags: hashtag._id}, function(err) {
          if(err) return next(err);
        });
      });

      if ((hashtags.length - 1) === i) {
        return next(null);
      }
    });
  } else {
    return next(null);
  }
};
