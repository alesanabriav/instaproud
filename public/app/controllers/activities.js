'use strict';
var React = require('react');
var List = require('views/activities/list.jsx');

module.exports = {
  feed: function() {
    React.render(<List /> , document.getElementById("app-container"));
  }
};

