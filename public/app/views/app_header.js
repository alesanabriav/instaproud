//Dependencies
global.jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;
//utils
var pubsub = require('utils/pubsub');

//templates
var templateHeader = require('templates/app_header.hbs');

module.exports = Backbone.View.extend({
  events: {
    'click .next-action': 'next'
  },

  //Listen events
  initialize: function() {
    var _this = this;
    pubsub.on('appHeader:showNext', _this.showNext, _this);
    pubsub.on('appHeader:hideNext', _this.hideNext, _this);
    pubsub.on('appHeader:change', _this.render, _this);
  },

  close: function() {
    var _this = this;
    _this.remove();
    _this.stopListening();
  },

  render: function(data) {
    var _this = this;
    if (data) {
      var template = templateHeader(data);
    } else {
      var template = templateHeader();
    }
    
    $(_this.el).empty();
    $(_this.el).append(template);
    return _this;
  },

  showNext: function() {
    $('.next-action').removeClass('hidden');
  },

  hideNext: function() {
    $('.next-action').addClass('hidden');
  },

  //execute event
  next: function(e) {
    e.preventDefault();
    pubsub.trigger('app:next');
  }
});