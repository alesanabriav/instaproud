"use strict";
var $ = require('jquery');
var React = require('react');
var AppNavView = require('views/app_nav.js');
var AppNav = require('views/app_nav.jsx');
var AppHeaderView = require('views/app_header.js');
var pubsub = require('utils/pubsub');
var checkUser = require('utils/check_user');

module.exports = {

  initialize: function() {
    var _this = this;
    _this.header();
    _this.nav();

    pubsub.on('AppNav:show', _this.nav, _this);
    pubsub.on('appHeader:render', _this.header, _this);
  },

  header: function(data) {
    var view = new AppHeaderView();

    $("#header-container")
    .empty()
    .append(view.render(data).el);
  },

  nav: function() {
    React.render(<AppNav />, document.getElementById('nav-container'));

    // var view = new AppNavView();

    // $("#nav-container")
    // .empty()
    // .append(view.render().el);
    // pubsub.trigger('footerNav:changeState');
  }

 }
