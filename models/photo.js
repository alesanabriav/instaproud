var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhotoSchema = new Schema({
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
  hashtags: [],
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

try {
  module.exports = mongoose.model('Photo');
} catch (err) {
  module.exports = mongoose.model('Photo', PhotoSchema);
}
