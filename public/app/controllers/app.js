global.jQuery = require('jquery');
var $ = global.jQuery;

var AppNavView = require('views/app_nav.js');
var AppHeaderView = require('views/app_header.js');
var AppPreloader = require('views/app_preloader.js');

//Utils
var pubsub = require('utils/pubsub');

module.exports = {

  initialize: function() {
    var _this = this;
    pubsub.on('AppNav:show', _this.nav, _this);
    pubsub.on('appHeader:render', _this.header, _this);
    
    _this.header();
    _this.nav();

    $.ajax({
      url: "/users/me/logged",
      method: "POST"
    }).then(function(user){
      localStorage.setItem("user", JSON.stringify(user));
    });
    
  },

  header: function(data) {
    var view = new AppHeaderView();
    $("#header-container").empty();
    $("#header-container").append(view.render(data).el);
  },

  nav: function() {
    var view = new AppNavView();
    $("#nav-container").empty();
    $("#nav-container").append(view.render().el);
  }

 }
