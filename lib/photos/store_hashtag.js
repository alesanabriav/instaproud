'use strict';
var Photo = require(__base + 'models/photo');
/**
 * search all photos by hashtag associated
 * @param  {String} query
 * @return {[type]}       [description]
 */
module.exports = function byHashtag(id, hashtagId, next) {
  Photo
    .findOneAndUpdate({_id: id}, {$addToSet: {hashtags: hashtagId}})
    .exec(function(err, photo) {
      if(err) return next(err);
      return next(null, photo);
    });
};
