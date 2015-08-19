'use strict';
var fs = require('fs-extra');
var sharp = require('sharp');
var getPaths = require(__base + 'lib/get_paths');

module.exports = function(img, user, next) {
  var folder = getPaths.folder(user);
  var userId = user._id;

  getPaths.file(user, userId, '.jpeg', function(err, filename) {
    if(err) return next(err);

    fs.mkdirs(folder, function(err) {
      if(err) return next(err);
      sharp.concurrency(2);
      sharp(img)
      .normalize()
      .sharpen()
      .quality(100)
      .toFile(folder + '/' + filename, function(err) {
        if (err) return next(err);
        return next(null, filename);
      });

    });
  });

};

