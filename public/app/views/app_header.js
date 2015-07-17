'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var templateHeader = require('templates/app_header.hbs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'click .next-action': 'next',
    'click .rotate-button': 'rotate'
  },

  //Listen events
  initialize: function() {
    this.listenTo(pubsub, 'view:remove', this.remove, this);
    this.listenTo(pubsub, 'appHeader:change', this.render, this);
    // this.listenTo(pubsub, 'input:onFocus', this.hide, this);
    // this.listenTo(pubsub, 'input:onFocusOut', this.show, this);

    this.listenTo(pubsub, 'appHeader:showNext', this.showNext, this);
    this.listenTo(pubsub, 'appHeader:hideNext', this.hideNext, this);

    this.listenTo(pubsub, 'appHeader:showCheck', this.showCheck, this);
    this.listenTo(pubsub, 'appHeader:hideCheck', this.hideCheck, this);

    this.listenTo(pubsub, 'appHeader:showRotate', this.showRotate, this);
    this.listenTo(pubsub, 'appHeader:hideRotate', this.hideRotate, this);

    this.listenTo(pubsub, 'appHeader:showBack', this.showBack, this);
    this.listenTo(pubsub, 'appHeader:hideBack', this.hideBack, this);

    this.listenTo(pubsub, 'appHeader:showClose', this.showClose, this);
    this.listenTo(pubsub, 'appHeader:hideClose', this.hideClose, this);

    this.listenTo(pubsub, 'appHeader:showCloseSession', this.showCloseSession, this);
    this.listenTo(pubsub, 'appHeader:hideCloseSession', this.hideCloseSession, this);
  },

  hide: function() {
    this.$el.parent().hide();
  },

  show: function() {
    this.$el.parent().show();
  },

  render: function(data) {
    var template;

    if (data) {
      template = templateHeader(data);
    } else {
      template = templateHeader();
    }

    $(this.el)
    .empty()
    .append(template);
    return this;
  },

  showNext: function() {
    this.$el.find('.next-button').removeClass('hidden');
  },

  hideNext: function() {
    this.$el.find('.next-button').addClass('hidden');
  },

  showCheck: function() {
    this.$el.find('.check-button').removeClass('hidden');
  },

  hideCheck: function() {
    this.$el.find('.check-button').removeClass('hidden');
  },

  showClose: function() {
    this.$el.find('.close-button').removeClass('hidden');
  },

  showCloseSession: function() {
    this.$el.find('.close-session-button').removeClass('hidden');
  },

  showRotate: function() {
    this.$el.find('.rotate-button').removeClass('hidden');
  },

  backClose: function() {
    this.$el.find('.back-button').removeClass('hidden');
  },

  //execute event
  next: function(e) {
    e.preventDefault();
    pubsub.trigger('app:next');
  },

  rotate: function(e) {
    e.preventDefault();
    pubsub.trigger('cropper:rotate');
  }
});
