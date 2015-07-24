'use strict';
var Photo = require(__base + 'models/photo');

/**
 * delete a photo from database
 * @param  {objectId} id - photo id
 * @param  {Function} cb - callback
 * @return {Function} cb - callback
 */
module.exports = function(id, cb) {
  Photo.update({_id: id}, {hidden: true}).exec(function(err) {
    if (err) return cb(err);
    return cb(null);
  });
};
