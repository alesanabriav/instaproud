var Backbone = require('backbone');
var _ = require('underscore');

var photo = Backbone.Model.extend({
  urlRoot: "/api/photos"
});

var photos = Backbone.Collection.extend({
  model: photo,
  url: "/api/photos"
});

module.exports = {
  photo: photo,
  photos: photos
}