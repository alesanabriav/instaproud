//Dependencies
global.jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;

var pubsub = require('utils/pubsub');

module.exports = Backbone.View.extend({
  el: ".header-nav",
  
  events: {
    'click .next-action': 'next'
  },

  //Listen events
  initialize: function() {
    console.log('start app header');
  },

  //execute event
  next: function(data) {
    pubsub.trigger('app:next');
  }
});