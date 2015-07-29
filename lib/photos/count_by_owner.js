'use strict';
var Photo = require(__base + 'models/photo');

module.exports = function CountByOwner(userId, next) {
  Photo.count({owner: userId}, function(err, count) {
    if (err) return next(err);
    return next(null, count);
  });
};
