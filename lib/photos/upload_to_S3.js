'use strict';
var aws = require('aws-sdk');
var fs = require('fs-extra');
var s3Config = require(__base + 'config/s3.js');
var moment = require('moment');

aws.config.update({
  accessKeyId: s3Config.keyId,
  secretAccessKey: s3Config.keySecret
});

module.exports = function uploadToS3(name, folder, next) {
  var s3 = new aws.S3({ params: { Bucket: s3Config.bucket } });
  var folderPath = __base + 'public/images/' + folder;
  var path = folderPath + '/' + name;
  var params;

  fs.readFile(path, function(err, file) {
    if(err) return next(err);
    var expires = parseInt(moment().add(1, 'years').format('X'));
    params = {
      Key: folder + '/' + name,
      Body: file,
      ACL: 'public-read',
      CacheControl: 'public, max-age=31536000',
      ContentType: 'image/jpeg',
      Expires: expires
    };

    s3.putObject(params, function(err, data) {
      if (err) return next(err);

      fs.remove(folderPath, function (err) {
        if (err) return next(err);

        return next(null, data);
      });
    });
  });
};
