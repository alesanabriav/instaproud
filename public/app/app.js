var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var helpers = require('helpers/helpers_hbs');

Backbone.$ = $;

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

Navigator.initialize();