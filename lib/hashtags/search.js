'use strict';
var Hashtag = require(__base + '/models/hashtag');

module.exports = function search(query, next) {
  Hashtag
  .find({name: new RegExp(query, 'i')})
  .exec(function(err, hashtags) {
    if (err) return next(err);
    return next(null, hashtags);
  });
};
