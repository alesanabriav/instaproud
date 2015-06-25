"use strict";
var sharp = require('sharp');
var fs = require('fs-extra');

module.exports = function processProfileImage(img, path, next) {
  sharp("./"+img)
  .resize(150)
  .quality(20)
  .toFile(path, function(err) {
    if (err) return next(err);

    fs.unlink("./"+img, function(err) {
      if (err) return next(err);
      return next(null);
    });

  });
}