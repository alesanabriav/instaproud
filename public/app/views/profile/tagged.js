"use strict";
var $ = require("jquery");
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var loadImages = require('utils/loadImages');
var template = require('templates/profile/tagged.hbs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'click .image-open': 'open'
  },

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
  },

  render: function(data) {
    var _this = this;

    _this.$el
    .empty()
    .append(template( data ));

    $("#app-container")
    .empty()
    .append(_this.$el);
    loadImages();
    return _this;
  }

});