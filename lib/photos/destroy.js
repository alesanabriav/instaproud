'use strict';
var Photo = require(__base + 'models/photo');

/**
 * delete a photo from database
 * @param  {objectId} id - photo id
 * @param  {Function} cb - callback
 * @return {Function} cb - callback
 */
module.exports = function(id, next) {
  Photo.findOne({_id: id}).remove().exec(function(err) {
    if (err) return next(err);
    return next(null);
  });
};
