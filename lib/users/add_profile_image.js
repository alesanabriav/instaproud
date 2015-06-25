"use strict";
var User = require('../../models/user');

module.exports = function addProfileImage(userId, profileImageName, next) {

  User.findOneAndUpdate({_id: userId}, {profile_image: profileImageName}, function(err, user) {
    if (err) return next(err);

    return next(null, user);
  });

}