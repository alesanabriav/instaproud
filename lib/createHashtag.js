//Models
var Hashtag = require('../models/hashtag');

module.exports =  {

  store: function(hashtags, photo) {
    var _this = this;
    _this.photo = photo;

    hashtags.forEach(function(name) {
      _this.find(name);
    });
  },

  /**
   * find hashtag and if not exist it created
   * in case if exist it updated
   * @param  string name
   */
  find: function(name) {
    var _this = this;

    Hashtag.findOne({name: name}, function(err, hashtag) {

      if (!hashtag) {
        _this.save(name);
      } else {
        _this.update(hashtag);
      }
    });
  },

  /**
   * save hashtag
   * @param  string name
   */
  save: function(name) {
    var hashtagNew = new Hashtag({name: name, photos: this.photo._id});
    hashtagNew.save(function(err) {
      if (err) throw err;
    });
  },

  /**
   * update hashtag with new photo id
   * @param  object hashtag
   */
  update: function(hashtag) {
    hashtag.update({$addToSet: {photos: this.photo._id} }, function(err, res) {
      if (err) throw err;
    });
  }
}