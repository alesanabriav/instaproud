'use strict';
var Hashtag = require(__base + '/models/hashtag');

/**
 * for each hashtag execute storeOrUpdate function 
 * if complete the foreach execute callback 
 * @param  {array}   text    array of hashtags
 * @param  {hash}   photoId  reference to photo
 * @param  {Function} next   callback
 * @return {Function} next   callback          
 */
function init(text, photoId, next) {
  var hashtags = text.match(/\#\w+\b/gm);

  if (hashtags instanceof Array && hashtags.length > 0) {
    hashtags.forEach(function(name, i) {

      storeOrUpdate(name, photoId);

      if ((hashtags.length - 1) === i) {
        return next();
      }
    });
  } else {
    return next();
  }

};

function storeOrUpdate(name, photoId) {
  var newHashtag;

  Hashtag.findOneAsync({name: name})
  .then(function(hashtag) {

    if (hashtag) {
      return Hashtag.findOneAndUpdateAsync(
        { _id: hashtag._id },
        { $addToSet: {photos: photoId} }
      );
    } else {
      newHashtag = new Hashtag({name: name, photos: photoId});
      return newHashtag.saveAsync();
    }
  })
  .spread(function(hashtag) {

  })
  .catch(function(err) {
    return err;
  })
}

module.exports = init;