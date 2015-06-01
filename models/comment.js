var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  commenter: {
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  text: String
});