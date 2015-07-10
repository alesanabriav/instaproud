"use strict";
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
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
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, 'appHeader:change', _this.render, _this);
    // _this.listenTo(pubsub, 'input:onFocus', _this.hide, _this);
    // _this.listenTo(pubsub, 'input:onFocusOut', _this.show, _this);

    _this.listenTo(pubsub, 'appHeader:showNext', _this.showNext, _this);
    _this.listenTo(pubsub, 'appHeader:hideNext', _this.hideNext, _this);

    _this.listenTo(pubsub, 'appHeader:showCheck', _this.showCheck, _this);
    _this.listenTo(pubsub, 'appHeader:hideCheck', _this.hideCheck, _this);

    _this.listenTo(pubsub, 'appHeader:showRotate', _this.showRotate, _this);
    _this.listenTo(pubsub, 'appHeader:hideRotate', _this.hideRotate, _this);

    _this.listenTo(pubsub, 'appHeader:showBack', _this.showBack, _this);
    _this.listenTo(pubsub, 'appHeader:hideBack', _this.hideBack, _this);

    _this.listenTo(pubsub, 'appHeader:showClose', _this.showClose, _this);
    _this.listenTo(pubsub, 'appHeader:hideClose', _this.hideClose, _this);
  },

  hide: function() {
    this.$el.parent().hide();
  },

  show: function() {
    this.$el.parent().show();
  },

  render: function(data) {

    var _this = this;

    if (data) {
      var template = templateHeader(data);
    } else {
      var template = templateHeader();
    }

    $(_this.el)
    .empty()
    .append(template);
    return _this;
  },

  showNext: function() {
    this.$el.find('.next-button').removeClass('hidden');
  },

  showCheck: function() {
    this.$el.find('.check-button').removeClass('hidden');
  },

  showClose: function() {
    this.$el.find('.close-button').removeClass('hidden');
  },

  showRotate: function() {
    this.$el.find('.rotate-button').removeClass('hidden');
  },

  backClose: function() {
    this.$el.find('.back-button').removeClass('hidden');
  },

  hideCheck: function() {
    this.$el.find('.check-button').removeClass('hidden');
  },

  hideNext: function() {
    this.$el.find('.next-button').addClass('hidden');
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