var Backbone = require('backbone');
var _ = require('underscore');
var urls = require('config/urls');

var comment = Backbone.Model.extend({
  urlRoot: urls.baseUrl+"/api/comments"
});

var comments = Backbone.Collection.extend({
  model: comment,
  url:urls.baseUrl+ "/api/comments"
});

module.exports = {
  comment: comment,
  comments: comments
}