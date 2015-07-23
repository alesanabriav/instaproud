'use strict';
var Photo = require(__base + 'models/photo');

module.exports = function(id, cb) {
  Photo.findOne({_id: id}).remove().exec(function(err) {
    if (err) return cb(err);
    return cb(null);
  });
};
