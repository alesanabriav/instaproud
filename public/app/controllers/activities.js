'use strict';
var store = require('views/activities/store');
var list = require('views/activities/list');
var models = require('models/activity');

module.exports = {
  initialize: function() {

  },

  store: function() {
    new store();
  },

  feed: function() {
    var collection = new models.activities();
    var view = new list({collection: collection});
    collection.fetch({reset: true});
  }
}
