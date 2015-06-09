var Backbone = require('backbone');
var _ = require('underscore');

var comment = Backbone.Model.extend({
  urlRoot: "/api/comments"
});

var comments = Backbone.Collection.extend({
  model: comment,
  url: "/api/comments"
});

module.exports = {
  comment: comment,
  comments: comments
}