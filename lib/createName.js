'use strict';
var crypto = require('crypto');

module.exports = function createHash(src, next) {
  var randomString = src + Date.now() + Math.random();
  var hash = crypto.createHash('md5').update(randomString).digest('hex');
  var err;

  if (src === '') {
    err = new Error('src not found');
    return next(err);
  }

  return next(null, hash);
};

