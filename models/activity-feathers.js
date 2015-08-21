'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ActivitySchema;

var activity = {
  schema: {
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
  },
  set: {
    transform: function(doc, ret) {
      delete ret._id;
    }
  }
};

module.exports = activity;
