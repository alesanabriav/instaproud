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

  },

  //execute event
  next: function(e) {
    e.preventDefault();
    pubsub.trigger('app:next');
  }
});