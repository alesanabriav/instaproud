'use strict';
var Hashtag = require(__base + '/models/hashtag');

module.exports = function storeOrUpdate(name, next) {
   var newHashtag;
   var nameLower = name.toLowerCase();

  Hashtag
    .findOne({name: nameLower})
    .exec(function(err, hashtag) {
      if(err) return next(err);
      if (!hashtag) {
        newHashtag = new Hashtag({name: nameLower});
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
