'use strict';
var aws = require('aws-sdk');
var fs = require('fs-extra');
var s3Config = require(__base + 'config/s3.js');

aws.config.update({
  accessKeyId: s3Config.keyId,
  secretAccessKey: s3Config.keySecret
});

module.exports = function uploadToS3(name, folder, next) {
  var s3 = new aws.S3({ params: { Bucket: s3Config.bucket } });
  var path = "././public/images/" + folder + "/" +name;
  var params;

  fs.readFile(path, function(err, file) {
    if(err) return next(err);

    params = {
      Key: folder + "/" + name,
      Body: file,
      ACL: 'public-read'
    };

    s3.putObject(params, function(err, data) {
      if (err) return next(err);

      return next(null, data);
    });

  });

}