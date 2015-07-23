"use strict";
var $ = require('jquery');
var React = require('react');
var AppNav = require('views/app_nav.jsx');
var AppHeader = require('views/app_header.jsx');
var pubsub = require('utils/pubsub');
var checkUser = require('utils/check_user');

module.exports = {
  initialize: function() {
    React.render(<AppHeader />, document.getElementById('header-container'));
    React.render(<AppNav />, document.getElementById('nav-container'));
  }
 }
