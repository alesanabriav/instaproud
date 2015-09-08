'use strict';
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');
var UserSchema;
var User;

UserSchema = new Schema({
  email: {
    type: String,
    required: '{PATH} requerido'
  },
  password: {
    type: String,
    required: 'contraseña requerida'
  },
  salt: String,
  username: {
    type: String,
    index: true,
    unique: true
  },
  'profile_image': String,
  name: String,
  area: String,
  bio: String,
  birthday: {
    day: {
      type: Number,
      default: ''
    },
    month: {
      type: Number,
      default: ''
    },
    year: {
      type: Number,
      default: ''
    }
  },
  gender: String,
  role: {
    type: String,
    default: 'consumer'
  },
  status: {
    type: String,
    default: false
  },
  loginAttemps: {
    type: Number,
    default: 0
  },
  lastLogin: {
    type: Date
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
    delete ret.loginAttemps;
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
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.salt = salt + Date.now();
      user.password = hash;
      next();
    });
  });
});

UserSchema.plugin(uniqueValidator);

User = mongoose.model('User', UserSchema);

User.schema.path('password').validate(function(value) {
  var rexPassword = /(?=.*[a-z])(?=.*[0-9]).{8,}/g;
  return rexPassword.test(value);
}, 'La contraseña no cumple con los parametros');

Promise.promisifyAll(User);
Promise.promisifyAll(User.prototype);

module.exports = User;
