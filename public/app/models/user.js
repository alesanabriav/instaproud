var Backbone = require('backbone');
var _ = require('underscore');
var urls = require('config/urls');

var user = Backbone.Model.extend({
  urlRoot: urls.baseUrl+"/users"
});

var users = Backbone.Collection.extend({
  model: user,
  url: urls.baseUrl+"/users"
});

module.exports = {
  user: user,
  users: users
}