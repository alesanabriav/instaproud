var crypto = require('crypto');

module.exports = function createName(src, cb) {
  var random_string = src + Date.now() + Math.random();
  var hash = crypto.createHash('md5').update(random_string).digest('hex');
  return cb(hash);
}
