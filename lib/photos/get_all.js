'use strict';
var Photo = require(__base + 'models/photo');

/**
 * get all photos with relationships
 * @param  {Integer}   photosSkip
 * @param  {Integer}   commentsSkip
 * @param  {Function} next         callback
 * @return {Function} next         callback
 */
module.exports = function getAll(photosSkip, commentsSkip, next) {

  Photo.find({}, null, {limit: 5, skip: photosSkip})
    .sort({created: 'desc'})
    .populate(['owner', 'liked'])
    .populate({
      path: 'comments',
      options: {
        sort: {created: 'asc'},
        limit: 5,
        skip: commentsSkip
      }
    })
    .execAsync()
    .then(function(photos) {
      return Photo
      .populate(photos, {
        path: 'comments.commenter',
        model: 'User'
      });
    })
    .then(function(photos) {
      return next(null, photos);
    })
    .catch(function(err) {
      return next(err);
    });
};
