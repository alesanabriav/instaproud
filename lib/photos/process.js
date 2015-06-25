"use strict";
var fs = require('fs-extra');
var sharp = require('sharp');

module.exports = function(folder, img, path, next) {
  fs.mkdirs(folder, function(err) {
    if(err) return next(err);

    sharp(img)
    .quality(75)
    .toFile(path, function(err) {
      if (err) return next(err);
      return next(null);
    });
  })

}

