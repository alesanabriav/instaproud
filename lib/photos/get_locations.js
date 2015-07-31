'use strict';
var Photo = require(__base + 'models/photo');
module.exports = function getLocations(userId, next) {
  Photo
    .find({owner: userId}, 'geolocation')
    .exec(function(err, res) {
      if(err) return next(err);
      return next(null, res);
    });
};
