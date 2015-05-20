var crypto = require('crypto');

module.exports = function rename(src) {
  var random_string = src + Date.now() + Math.random();
  return crypto.createHash('md5').update(random_string).digest('hex');
}
