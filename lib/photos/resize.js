'use strict';
var fs = require('fs-extra');
var sharp = require('sharp');
var getPaths = require(__base + 'lib/get_paths');

/**
 * Store a temporary resize photo and delete original photo
 * @param  {file}   file
 * @param  {object}   user
 * @param  {Function} next
 * @return {Function} next
 */
module.exports = function compressImage(file, user, next) {
  var path = file.path;
  var userId = user._id;
  var folder = getPaths.folder(user);

  getPaths.file(user, path, '.jpeg', function(err, filename) {
    if(err) return next(err);

    fs.mkdirs(folder, function(err) {
      if(err) return next(err);
      sharp.concurrency(2);
      sharp(__base + path)
      .quality(100)
      .resize(500)
      .normalize()
      .toFormat('jpeg')
      .toFile(folder + '/' + filename, function(err) {
        if (err) return next(err);
        fs.remove(__base + path, function (err) {
          if (err) return next(err);
          return next(null, 'images/' + userId + '/' + filename);
        });

      });
    });
  });
};

