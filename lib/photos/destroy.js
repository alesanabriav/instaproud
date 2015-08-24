'use strict';
var Photo = require(__base + 'models/photo');
var Activity  = require(__base + 'models/activity');
/**
 * delete a photo from database
 * @param  {objectId} id - photo id
 * @param  {Function} cb - callback
 * @return {Function} cb - callback
 */
module.exports = function(id, next) {
  Activity.find({photo: id})
  .remove()
  .exec(function(err) {
    if (err) return next(err);
    Photo
    .findOne({_id: id})
    .remove()
    .exec(function(err) {
      if (err) return next(err);
      return next(null);
    });
  });
};
