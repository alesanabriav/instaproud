'use strict';
var Hashtag = require(__base + '/models/hashtag');
var storeHashtag = require(__base + 'lib/photos/store_hashtag');

function storeOrUpdate(name, next) {
  var newHashtag;
  Hashtag
    .findOne({name: name})
    .exec(function(err, hashtag) {
      if(err) return next(err);
      if (!hashtag) {
        newHashtag = new Hashtag({name: name});
        newHashtag
          .save(function(err, hash) {
            if(err) return next(err);
            return next(null, hash);
          });
      } else {
        return next(null, hashtag);
      }
    });
}

/**
 * for each hashtag execute storeOrUpdate function
 * if complete the foreach execute callback
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

        storeHashtag(photoId, hashtag._id, function(err) {
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
