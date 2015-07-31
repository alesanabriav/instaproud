'use strict';
var base = __base;
var Comment = require(base + 'models/comment');

/**
 * Delete a comment
 * @param  {objectId}   commentId
 * @param  {Function} next
 * @return {Function} next
 */
module.exports = function destroyComment(commentId, next) {
  Comment.findOne({_id: commentId}).remove().exec(function(err) {
    if(err) return next(err);
    return next(null);
  });
};
