'use strict';
var Photo = require(__base + 'models/photo');

module.exports = function updateArray(id, data, next) {
  Photo
    .findOneAndUpdate({_id: id}, {$addToSet: data})
    .exec(function(err, photo) {
      if(err) return next(err);
      return next(null, photo);
    });
};
