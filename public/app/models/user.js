var Backbone = require('backbone');
var _ = require('underscore');

var user = Backbone.Model.extend({
  urlRoot: "/users"
});

var users = Backbone.Collection.extend({
  model: user,
  url: "/users"
});

module.exports = {
  user: user,
  users: users
}