"use strict";
var crypto = require('crypto');

module.exports = function createName(src, next) {
  var random_string = src + Date.now() + Math.random();
  var hash = crypto.createHash('md5').update(random_string).digest('hex');
  var err;

  if (src === "") {
    err = new Error('src not found');
    return next(err);
  };

  return next(null, hash);
}
