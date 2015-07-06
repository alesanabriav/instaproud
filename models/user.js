'use strict';
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var UserSchema;
var User;

UserSchema = new Schema({
  email: {
    type: String,
    required: '{PATH} requerido',
    unique: true
  },
  password: {
    type: String,
    required: 'contraseña requerida'
  },
  salt: String,
  username: String,
  'profile_image': String,
  name: String,
  area: String,
  bio: String,
  birthday: {
    type: Date
  },
  gender: String,
  role: {
    type: String,
    default: 'consumer'
  },
  active: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret.password;
    delete ret.created;
    delete ret.updated;
    delete ret.salt;
    delete ret._id;
    delete ret.__v;
  }
});

UserSchema.methods.validPassword = function(password) {
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

UserSchema.pre('save', function(next) {
  var user = this;
  var username = user.email.split('@');
  user.username = username[0];
  user.updated = Date.now;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.salt = salt + Date.now();
      user.password = hash;
      next();
    });
  });
});

User = mongoose.model('User', UserSchema);
Promise.promisifyAll(User);
Promise.promisifyAll(User.prototype);

module.exports = User;