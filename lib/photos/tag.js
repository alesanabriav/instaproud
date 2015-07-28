'use strict';
var searchUser = require(__base + 'lib/users/search');
var updateArray = require(__base + 'lib/photos/update_array');

module.exports = function init(text, photoId, next) {
  var tags = text.match(/\@\w+\b/gm);

  if (tags instanceof Array && tags.length > 0) {
    tags.forEach(function(name, i) {
      var username = name.replace('@', '');
      searchUser({username: username}, function(err, user){
        if(err) return next(err);
        updateArray(photoId, {tagged: user.id}, function(err) {
          if(err) return next(err);
        });
      });

      if ((tags.length - 1) === i) {
        return next(null);
      }
    });
  } else {
    return next(null);
  }
};
