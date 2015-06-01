var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HashtagSchema = new Schema({
  name: String,  
  photos: [{
    type: Schema.Types.ObjectId, 
    ref: 'Photo' 
  }]
});

HashtagSchema.set('toJSON', {
 transform: function (doc, ret, options) {
   ret.id = ret._id;
   delete ret._id;
   delete ret.__v;
 }
});

try {
  module.exports = mongoose.model('Hashtag');
} catch (err) {
  module.exports = mongoose.model('Hashtag', HashtagSchema);
}