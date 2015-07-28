'use strict';
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Hashtag;

var HashtagSchema = new Schema({
  name: String
});

HashtagSchema.set('toJSON', {
 transform: function (doc, ret) {
   ret.id = ret._id;
   delete ret._id;
   delete ret.__v;
 }
});

Hashtag = mongoose.model('Hashtag', HashtagSchema);

Promise.promisifyAll(Hashtag);
Promise.promisifyAll(Hashtag.prototype);
module.exports = Hashtag;
