var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema;
ActivitySchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: String,
  created: {
    type: Date,
    default: Date.now
  }
});

try {
  module.exports = mongoose.model('Activity');
} catch (err) {
  module.exports = mongoose.model('Activity', ActivitySchema);
}