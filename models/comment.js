"use strict";
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema;
var Comment;

CommentSchema = new Schema({
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

CommentSchema.set('toJSON', {
  transform: function (doc, ret, options) {
   ret.id = ret._id;
   delete ret._id;
   delete ret.__v;
  }
});

Comment = mongoose.model('Comment', CommentSchema);
Promise.promisifyAll(Comment);
Promise.promisifyAll(Comment.prototype);
module.exports = Comment;