'use strict';
var React = require('react');
var Store = require('views/activities/store');
var List = require('views/activities/list.jsx');

module.exports = {
  store: function() {
    new Store();
  },

  feed: function() {
    React.render(<List /> , document.getElementById("app-container"));
  }
};

