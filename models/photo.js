'use strict';
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
  geolocation: {
    longitude: Number,
    latitude: Number,
    name: String,
    address: String
  },
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
  hashtags: [{
    type: Schema.Types.ObjectId,
    ref: 'Hashtag'
  }],
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  starred: Boolean,
  hidden: Boolean
});

PhotoSchema.set('toJSON', {

  transform: function (doc, ret) {
    var likesCount = 0;
    var commentsCount = 0;
    var hashtagsCount = 0;
    var taggedCount = 0;

    if (ret.liked) {
      likesCount = ret.liked.length;
    }

    if (ret.comments) {
      commentsCount =  ret.comments.length;
    }

    if (ret.hashtags) {
      hashtagsCount =  ret.hashtags.length;
    }

    if (ret.tagged) {
      taggedCount =  ret.tagged.length;
    }

   ret.id = ret._id;
   ret.likesCount = likesCount;
   ret.commentsCount = commentsCount;
   ret.taggedCount = taggedCount;
   ret.hashtagsCount = hashtagsCount;
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
