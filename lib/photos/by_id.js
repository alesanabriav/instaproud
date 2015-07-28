'use strict';
var Photo = require(__base + 'models/photo');

/**
 * get photo by id
 * @param  {Hash}   id   photo id
 * @param  {Function} next
 * @return {Function} next
 */
module.exports = function byId(id, next) {

  Photo
   .findById(id)
   .populate(['liked', 'owner', 'tagged', 'comments'])
   .exec(function(err, photo) {
      if(err) return next(err);
      Photo.populate(photo, {
        path: 'comments.commenter',
        model: 'User'
      }, function(err) {
        if(err) return next(err);
        return next(null, photo);
      });
    });
};
