'use strict';
var createHash = require(__base + 'lib/createName');

module.exports = {
  folder: function(user) {
    var userId = user._id;
    return "public/images/" + userId
  },

  file: function(user, path, extension, next) {
    var userId = user._id;
    var time = Date.now();
    var filename;

    createHash(path, function(err, hash) {
      if (err) return next(err);
      filename = userId + "_" + hash + "_" + time + extension;
      return next(null, filename);
    });
    
  }
}