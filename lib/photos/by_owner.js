'use strict';
var Photo = require(__base + 'models/photo');

/**
 * get all photos by owner id
 * @param  {object}   user      
 * @param  {Integer}   photosSkip 
 * @param  {Function} next
 * @return {Function}  next
 */
module.exports = function byOwnerId(user, photosSkip, next) {
  var data;

  Photo.find({owner: user._id})
  .sort({created: 'desc'})
  .limit(12)
  .skip(photosSkip)
  .exec(function(err, photos) {
    if (err) return next(err);
    data = {user: user, photos: photos};
    return next(null, data);
  });
};