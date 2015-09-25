'use strict';
global.jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');
var nprogress = require('nprogress');
var redirect = require('utils/redirect');
Backbone.$ = $;

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

$( document ).ajaxError(function( event, jqxhr) {
  if (jqxhr.status === 403) {
    var url = window.location.hash.replace('#', '-hash-');
    if(url == '-hash-login?urlTo=') {
      url = '';
    }

    router.navigate('#login?urlTo=' + url, {trigger: true, replace: true});
  }
});

/** On ajax complete hide preloader */
$( document ).ajaxComplete(function() {
  nprogress.done();
});