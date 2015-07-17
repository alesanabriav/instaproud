'use strict';
var Photo = require(__base + 'models/photo');

/**
 * get all photos by tagged id
 * @param  {object}   user
 * @param  {Integer}   photosSkip
 * @param  {Function} next
 * @return {Function}  next
 */
module.exports = function byTagged(user, photosSkip, next) {
  var data;

  Photo.find({tagged: user._id})
  .sort({created: 'desc'})
  .limit(12)
  .skip(photosSkip)
  .exec(function(err, photos) {
    if (err) next(err);
    data = {user: user, photos: photos};
    return next(null, data);
  });
};
