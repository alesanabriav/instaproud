"use strict";
global.jQuery = require('jquery');
var $ = jQuery;
var _ = require('underscore');
var Backbone = require('backbone');
var attachFastClick = require('fastclick');
var unveil = require('unveil');
var pubsub = require('utils/pubsub');
var helpers = require('helpers/helpers_hbs');

Backbone.$ = $;
attachFastClick(document.body);

var Router = require('./router');
var router = new Router();
Backbone.history.start();

var Navigator = {

  initialize: function() {
    pubsub.on('navigator:change', this.trigger, this);
  },

  trigger: function(url) {
    router.navigate(url, {trigger: true, replace: true});
  }

}

$(window).scroll(_.throttle(function(){
  var body = document.body;
  var tolerance = 400;
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
    window.location.replace('/#login');
  };
});



// $.ajaxSetup({
//    beforeSend: function() {
//     $('.preloader').removeClass('hidden');
//     $('.preloader').addClass('animated bounce');
//    },
//    complete: function() {
//       $('.preloader').addClass('hidden');
//    }
// });


Navigator.initialize();