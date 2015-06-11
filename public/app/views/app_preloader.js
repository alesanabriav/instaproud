"use strict";
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  //Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "appPreloader", _this.show, _this);
    _this.listenTo(pubsub, "appPreloader", _this.hide, _this);
  },

  show: function() {
    $('.preloader').removeClass('hidden');
    $('.preloader').addClass('animated bounce');
  },

  hide: function() {
    $('.preloader').addClass('hidden');
  }

});