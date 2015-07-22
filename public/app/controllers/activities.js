'use strict';
var React = require('react');
var Store = require('views/activities/store');
var list = require('views/activities/list');
var models = require('models/activity');
var List = require('views/activities/list.jsx');

module.exports = {
  store: function() {
    new Store();
  },

  feed: function() {
    React.render(<List /> , document.getElementById("app-container"));
    // var collection = new models.activities();
    // var view = new list({collection: collection});
    // collection.fetch({reset: true});
  }
};

