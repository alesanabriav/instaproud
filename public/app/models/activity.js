var Backbone = require('backbone');
var _ = require('underscore');

var activity = Backbone.Model.extend({
  urlRoot: "/api/activities"
});

var activities = Backbone.Collection.extend({
  model: activity,
  url: "/api/activities"
});

module.exports = {
  activity: activity,
  activities: activities
}