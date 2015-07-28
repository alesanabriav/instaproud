'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ActivitySchema;

ActivitySchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'Photo'
  },
  text: String,
  created: {
    type: Date,
    default: Date.now
  }
});

ActivitySchema.set('toJSON', {
  transform: function (doc, ret) {
   ret.id = ret._id;
   delete ret._id;
   delete ret.__v;
  }
});

try {
  module.exports = mongoose.model('Activity');
} catch (err) {
  module.exports = mongoose.model('Activity', ActivitySchema);
}
