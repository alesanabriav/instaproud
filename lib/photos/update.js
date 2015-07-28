'use strict';
var Photo = require(__base + 'models/photo');

/**
 * Update a photo
 * @param  {objectId} id -  photo id
 * @param  {object}   data - photo data
 * @param  {Function} next - callback
 * @return {Function} next - callback
 */
module.exports = function(id, data, next) {
  Photo
    .update({_id: id}, {$set: data})
    .exec(function(err){
      if(err) return next(err);

      Photo
        .findOne({_id: id})
        .exec(function(err, photo) {
          if(err) return next(err);
          return next(null, photo);
        });
  });
};
