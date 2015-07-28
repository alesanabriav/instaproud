'use strict';
var User = require(__base + '/models/user');

module.exports = function search(query, next) {
  User
    .findOne(query)
    .exec(function(err, user) {
      if(err) return next(err);
      return next(null, user);
    });
};
