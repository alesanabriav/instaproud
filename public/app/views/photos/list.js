"use strict";

var $ = require("jquery");
var _ = require('underscore');
var Backbone = require('backbone');
var timeago = require('timeago');
var pubsub = require('utils/pubsub');
var itemView = require('views/photos/item');

Backbone.$ = $;

module.exports = Backbone.View.extend({

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(_this.collection, 'reset', _this.render);
  },

  render: function() {
    var _this = this;
    var views = [];
    var view;

    _this.collection.each(function(model) {
      view = new itemView({model: model});
      views.push(view.render().el);
    });

    _this.$el.empty();
    _this.$el.css('padding-bottom', '40px');
    _this.$el.append(views);
    $("#app-container").empty();
    $("#app-container").append(_this.el);
  }
});