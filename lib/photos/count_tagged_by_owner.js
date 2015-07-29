'use strict';
var Photo = require(__base + 'models/photo');

module.exports = function countTaggedByOwner(next) {
  Photo.count({tagged: userId}, function(err, count) {
    if (err) return next(err);
    return next(null, count);
  });
};
