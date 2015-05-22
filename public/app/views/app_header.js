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
    var _this = this;
    pubsub.on('appHeader:showNext', _this.showNext, _this);
    pubsub.on('appHeader:hideNext', _this.hideNext, _this);
  },

  showNext: function() {
    $('next-action').removeClass('hidden');
  },

  hideNext: function() {
    $('next-action').addClass('hidden');
  },

  //execute event
  next: function(e) {
    e.preventDefault();
    pubsub.trigger('app:next');
  }
});