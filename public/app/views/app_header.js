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

  /** Start listen events */
  initialize: function() {
    this.listenTo(pubsub, 'view:remove', this.remove, this);
    this.listenTo(pubsub, 'appHeader:change', this.render, this);
    this.listenTo(pubsub, 'appHeader:showNext', this.showElement('.next-button'), this);
    this.listenTo(pubsub, 'appHeader:hideNext', this.hideElement('.next-button'), this);
    this.listenTo(pubsub, 'appHeader:showCheck', this.showElement('.check-button'), this);
    this.listenTo(pubsub, 'appHeader:hideCheck', this.hideElement('.check-button'), this);
    this.listenTo(pubsub, 'appHeader:showRotate', this.showElement('.rotate-button'), this);
    this.listenTo(pubsub, 'appHeader:hideRotate', this.hideElement('.rotate-button'), this);
    this.listenTo(pubsub, 'appHeader:showBack', this.showElement('.back-button'), this);
    this.listenTo(pubsub, 'appHeader:hideBack', this.hideElement('.back-button'), this);
    this.listenTo(pubsub, 'appHeader:showClose', this.showClose, this);
    this.listenTo(pubsub, 'appHeader:hideClose', this.hideClose, this);
  },

  /**
   * attach template with data
   * @param {object} data
   * @return {object} this
   */
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

  show: function() {
    this.$el.parent().show();
  },

  hide: function() {
    this.$el.parent().hide();
  },

  /** show element hidden */
  showElement: function(el) {
    this.$el.find(el).removeClass('hidden');
  },

  /** hide element showed */
  hideElement: function(el) {
    this.$el.find(el).removeClass('hidden');
  },

  /** Trigger event next */
  next: function(e) {
    e.preventDefault();
    pubsub.trigger('app:next');
  },

  /** Trigger event rotate */
  rotate: function(e) {
    e.preventDefault();
    pubsub.trigger('cropper:rotate');
  }
});
