"use strict";
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PhotoSchema;
var Photo;

PhotoSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  path: String,
  caption: String,
  likes: Number,
  liked: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  tagged: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
});

PhotoSchema.set('toJSON', {
  transform: function (doc, ret, options) {
   ret.id = ret._id;
   delete ret._id;
   delete ret.__v;
  }
});

PhotoSchema.pre('save', function(next) {
  var user = this;
  user.updated = Date.now;
  next();
});

Photo = mongoose.model('Photo', PhotoSchema);

Promise.promisifyAll(Photo);
Promise.promisifyAll(Photo.prototype);
module.exports = Photo;