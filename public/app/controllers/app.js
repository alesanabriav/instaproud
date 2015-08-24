"use strict";
var React = require('react');
var AppNav = require('views/app_nav.jsx');
var AppHeader = require('views/app_header.jsx');
var Terms = require('views/terms_conditions.jsx');

module.exports = {
  initialize: function() {
    React.render(<AppHeader />, document.getElementById('header-container'));
    React.render(<AppNav />, document.getElementById('nav-container'));
  },
  unmountNav: function() {
    var container = document.getElementById('nav-container');
    return React.unmountComponentAtNode(container);
  },
  termsAndConditions: function() {
    React.render(<Terms />, document.getElementById('app-container'));
    this.unmountNav();
  }
 }
