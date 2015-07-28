'use strict';
var React = require('react');
var List = require('views/activities/list.jsx');
var store = require('stores/activities');

module.exports = {
  initialize: function() {
    store.initialize();
  },

  feed: function() {
    React.render(<List /> , document.getElementById("app-container"));
  }
};

