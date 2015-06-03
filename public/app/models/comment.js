var Backbone = require('backbone');
var _ = require('underscore');

var comment = Backbone.Model.extend({
  urlRoot: "/comments"
});

var comments = Backbone.Collection.extend({
  model: comment,
  url: "/comments"
});

module.exports = {
  comment: comment,
  comments: comments
}