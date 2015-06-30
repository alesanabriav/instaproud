"use strict";
var fs = require('fs-extra');
var sharp = require('sharp');

module.exports = function processProfileImage(img, folder, path, next) {

  fs.mkdirs(folder, function(err) {
    if(err) return next(err);
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
  });
}