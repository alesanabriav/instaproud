"use strict";
var Photo = require('../../models/photo');

module.exports = function byOwnerId(user, photosSkip, next) {
  var data;

  Photo.find({owner: user._id})
  .sort({created: 'desc'})
  .limit(12)
  .skip(photosSkip)
  .exec(function(err, photos) {
    if (err) next(err);
    data = {user: user, photos: photos};
    return next(null, data);
  });
};