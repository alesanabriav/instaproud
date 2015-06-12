var Backbone = require('backbone');
var _ = require('underscore');
var urls = require('config/urls');

var activity = Backbone.Model.extend({
  urlRoot: urls.baseUrl+"/api/activities"
});

var activities = Backbone.Collection.extend({
  model: activity,
  url: urls.baseUrl+"/api/activities"
});

module.exports = {
  activity: activity,
  activities: activities
}