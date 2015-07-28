'use strict';
var Photo = require(__base + 'models/photo');

module.exports = function byStarred(next) {
  Photo
    .findOne({starred: true})
    .populate('owner', 'username email profile_image area name')
    .populate('liked', 'username email profile_image area name')
    .populate({
      path: 'comments',
      options: {
        sort: {created: 'desc'},
        limit: 5,
        skip: 0
      }
    })
    .exec(function(err, photo) {
    if(err) return next(err);
     Photo
      .populate(photo, {
        path: 'comments.commenter',
        model: 'User',
        select: 'username'
      }, function(err, pho){
        if(err) return next(err);
        return next(null, pho);
      });
  });
};
