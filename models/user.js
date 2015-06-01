var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  email: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  salt: String,
  username: String,
  profile_image: String,
  name: String,
  area: String,
  bio: String,
  birthday: Date,
  gender: String,
  role: {
    type: String, 
    default: 'consumer' 
  },
  photos:  [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Photo' 
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

UserSchema.set('toJSON', {
 transform: function (doc, ret, options) {
   ret.id = ret._id;
   delete ret.password;
   delete ret._id;
   delete ret.__v;
 }
});

UserSchema.methods.validPassword = function(password) {
  var user = this;
  return bcrypt.compareSync(password,  user.password);
};

UserSchema.pre('save', function(next) {
  var user = this;
  user.updated = Date.now;
  username = user.email.split('@');
  user.username = username[0];
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

try {
  module.exports = mongoose.model('User');
} catch (err) {
  module.exports = mongoose.model('User', UserSchema);
}
