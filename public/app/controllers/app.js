"use strict";
var $ = require('jquery');
var AppNavView = require('views/app_nav.js');
var AppHeaderView = require('views/app_header.js');
var pubsub = require('utils/pubsub');
var checkUser = require('utils/check_user');

module.exports = {

  initialize: function() {
    var _this = this;
    var route = window.location.hash;
    _this.header();
    _this.nav();
    pubsub.on('AppNav:show', _this.nav, _this);
    pubsub.on('appHeader:render', _this.header, _this);


    // if (route !== "#register") {
    //   checkUser(function(e) {
    //     if (e === false) {
    //       window.location.replace('/#login');
    //     };
    //   });
    // };
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
