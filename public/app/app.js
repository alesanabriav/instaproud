"use strict";
global.jQuery = require('jquery');
var $ = jQuery;
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var loadImages = require('utils/loadImages');
var helpers = require('helpers/helpers_hbs');
var fastclick = require('fastclick');
var nprogress = require('nprogress');

Backbone.$ = $;

var Router = require('./router');
var router = new Router();
Backbone.history.start();

var Navigator = {

  initialize: function() {
    pubsub.on('navigator:change', this.trigger, this);
  },

  trigger: function(url) {
    router.navigate(url, {trigger: true});
  }

}

Navigator.initialize();


$( document ).ajaxStart(function() {
  console.log(window.location.hash);
  if (window.location.hash !== "#register" && window.location.hash !== "#login") {
    nprogress.inc();
  }

});

$( document ).ajaxComplete(function() {
  nprogress.done();
});

$(window).scroll(_.throttle(function(){
  var body = document.body;
  var tolerance = 500;
  var threshold = body.scrollHeight - window.innerHeight - tolerance;

  if($(window).scrollTop() > threshold) {
    pubsub.trigger("general:scroll")
  }

}, 1000));


$("body").on("click", ".back-button", function (event) {
    event.preventDefault();
    window.history.back();
});


$( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
  if (jqxhr.status === 403) {
    router.navigate('#login', {trigger: true, replace: true});
  };
});


window.onload = loadImages();

