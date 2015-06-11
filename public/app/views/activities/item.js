"use strict";

var $ = require("jquery");
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var templat = require('templates/activities/item.hbs');

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
    var template = templat( data );
    _this.$el.empty();
    _this.$el.append(template);
    $("#app-container").html(_this.$el);
    return _this;
  }

});