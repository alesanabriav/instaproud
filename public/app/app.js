'use strict';
global.jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var attachFastClick = require('fastclick');
var nprogress = require('nprogress');
var redirect = require('utils/redirect');
var scrollTrigger = require('scroll-trigger');
Backbone.$ = $;

attachFastClick(document.body);
var Router = require('./router');
var router = new Router();
Backbone.history.start();

redirect(router).initialize();

/** On ajax start show preloader */
$( document ).ajaxStart(function() {
  if (window.location.hash !== '#register' && window.location.hash !== '#login') {
    nprogress.inc();
  }
});

/** On ajax complete hide preloader */
$( document ).ajaxComplete(function() {
  nprogress.done();
});

scrollTrigger(1000, 700, function() {
  pubsub.trigger('general:scroll');
});

$('body').on('click', '.back-button', function (event) {
  event.preventDefault();
  window.history.back();
});

$( document ).ajaxError(function( event, jqxhr) {
  if (jqxhr.status === 403) {
    router.navigate('#login', {trigger: true, replace: true});
  }
});

