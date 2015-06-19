"use strict";
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var templateNav = require('templates/app_nav.hbs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'change input': 'getPhoto'
  },

  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, 'view:remove', _this.remove, _this);
    _this.listenTo(pubsub, 'footerNav:remove', _this.remove, _this);
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
  }
});