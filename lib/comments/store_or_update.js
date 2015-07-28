'use strict';
var Hashtag = require(__base + '/models/hashtag');

module.exports = function storeOrUpdate(name, next) {
   var newHashtag;
  Hashtag
    .findOne({name: name})
    .exec(function(err, hashtag) {
      if(err) return next(err);
      if (!hashtag) {
        newHashtag = new Hashtag({name: name});
        newHashtag
          .save(function(err, hash) {
            if(err) return next(err);
            return next(null, hash);
          });
      } else {
        return next(null, hashtag);
      }
    });
};
