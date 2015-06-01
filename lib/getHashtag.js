module.exports = function getHashtag(caption, cb) {
  var regexp = /\#\w\w+\b/gm
  var result = caption.match(regexp);
  return cb(result);
}