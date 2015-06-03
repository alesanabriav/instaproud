var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  commenter: {
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
  module.exports = mongoose.model('Comment');
} catch (err) {
  module.exports = mongoose.model('Comment', CommentSchema);
}