"use strict";
var $ = require("jquery");
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var loadTimeago = require('utils/timeago');
var template = require('templates/activities/item.hbs');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'click .image-open': 'open',
  },

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "profile:render", _this.render, _this);
  },

  render: function(data) {
    var _this = this;
    _this.$el
    .empty()
    .append(template( _this.model.toJSON() ));

    $("#app-container").html(_this.$el);
    loadTimeago(_this.$el);
    return _this;
  }

});