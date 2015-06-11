"use strict";
var $ = require('jquery');
var AppNavView = require('views/app_nav.js');
var AppHeaderView = require('views/app_header.js');
var AppPreloader = require('views/app_preloader.js');
var pubsub = require('utils/pubsub');

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
    var $header =  $("#header-container");
    $header.empty().append(view.render(data).el);
  },

  nav: function() {
    var view = new AppNavView();
    var $nav = $("#nav-container");
    $nav.empty().append(view.render().el);
  }

 }
