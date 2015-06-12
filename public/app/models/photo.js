var Backbone = require('backbone');
var _ = require('underscore');
var urls = require('config/urls');

var photo = Backbone.Model.extend({
  urlRoot: urls.baseUrl+"/api/photos"
});

var photos = Backbone.Collection.extend({
  model: photo,
  url: urls.baseUrl+"/api/photos"
});

module.exports = {
  photo: photo,
  photos: photos
}