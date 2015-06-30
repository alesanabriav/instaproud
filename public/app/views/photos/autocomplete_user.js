"use strict";

var $ = require("jquery");
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var template = require('templates/photos/autocomplete_users.hbs');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "autocompleteUser:render", _this.render, _this);
  },

  render: function(users) {
    var _this = this;

    _this.$el
    .empty()
    .append( template( users ) );

    $(".search-autocomplete")
    .empty()
    .append(this.$el);
  }
})