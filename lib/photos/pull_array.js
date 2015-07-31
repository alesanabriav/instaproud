'use strict';
var Photo = require(__base + 'models/photo');

module.exports = function updateArray(id, data, next) {
  Photo
    .update({_id: id}, {$addToSet: data})
    .exec(function(err, photo) {
      if(err) return next(err);
      Photo
        .findOne({_id: id})
        .exec(function(err, photo) {
          if(err) return next(err);
          return next(null, photo);
      });
  });
};
