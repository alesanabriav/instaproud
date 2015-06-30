'use strict';
var Photo = require(__base + 'models/photo');

module.exports = function(data, next) {

  var newPhoto = new Photo(data);

    newPhoto.saveAsync()
    .spread(function(photo) {

      uploadToS3(src, req.user._id, function(err, data) {
        if (err) return next(err);
        return next(null, photo);
      });

    })
    .catch(function(err) {
      return next(err);
    })
}