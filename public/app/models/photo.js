var Backbone = require('backbone');
var _ = require('underscore');

var photo = Backbone.Model.extend({
  urlRoot: "/photos"
});

var photos = Backbone.Collection.extend({
  model: photo,
  url: "/photos"
});

module.exports = {
  photo: photo,
  photos: photos
}