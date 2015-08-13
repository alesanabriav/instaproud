'use strict';
var Hashtag = require(__base + '/models/hashtag');

module.exports = function getAll(next) {
  Hashtag
  .find({})
  .limit(10)
  .sort({created: 'desc'})
  .exec(function(err, hashtags){
    if(err) return next(err);
    return next(null, hashtags);
  });
};
