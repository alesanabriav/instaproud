"use strict";
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var templateNav = require('templates/app_nav.hbs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'change input': 'getPhoto',
    'click a': 'changeState'
  },

  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, 'view:remove', _this.remove, _this);
    _this.listenTo(pubsub, 'footerNav:changeState', _this.changeState, _this);
    _this.listenTo(pubsub, 'footerNav:remove', _this.remove, _this);
    _this.listenTo(pubsub, 'input:onFocus', _this.hide, _this);
    _this.listenTo(pubsub, 'input:onFocusOut', _this.show, _this);
  },

  hide: function() {
    this.$el.hide();
  },

  show: function() {
    this.$el.show();
  },

  render: function() {
    var _this = this;

    _this.$el
    .empty()
    .append(templateNav());

    return _this;
  },

  getPhoto: function(e) {
    var $file = $(e.currentTarget)[0].files[0];
    pubsub.trigger('photo:render', $file);
  },

  changeState: function(e) {
    var $btns = $(this.el).find('a');
    var url = window.location.hash;
    console.log(url);
    if (!url) {
      console.log('fals');
      $(this.el).find('.home').addClass('active');
    }

    $btns.each(function(btn) {
      console.log(this);

      if (url === $(this).attr('href')) {
        $(this).parent().addClass('active');
      };
    });

  }
});