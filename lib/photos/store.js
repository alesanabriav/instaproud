'use strict';
var Photo = require(__base + 'models/photo');
var uploadToS3 = require(__base + 'lib/photos/upload_to_S3');

module.exports = function(data, next) {
  console.log(data);
  var newPhoto = new Photo(data);

    newPhoto.saveAsync()
    .spread(function(photo) {

      uploadToS3(data.path, data.owner, function(err, res) {
        if (err) return next(err);
        return next(null, photo);
      });

    })
    .catch(function(err) {
      return next(err);
    })
}