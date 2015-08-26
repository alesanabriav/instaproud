'use strict';
var Photo = require(__base + 'models/photo');
var Hashtag = require(__base + 'models/hashtag');

/**
 * search all photos by hashtag associated
 * @param  {String} query
 * @return {[type]}       [description]
 */
module.exports = function byHashtag(hashtag, next) {
  var name = hashtag;

  Hashtag
  .findOne({name: name.toLowerCase()})
  .exec(function(err, hashtagFound){
    if(err) return next(err);
    if (hashtagFound) {
      Photo
      .find({ hashtags: { $in: [hashtagFound.id] } })
      .exec(function(err, photos) {
        if(err) return next(err);
        return next(null, photos);
      });
    } else {
      return next(null, []);
    }
  });
};
