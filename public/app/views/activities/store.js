"use strict";
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');

Backbone.$ = $;

module.exports = Backbone.View.extend({

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "activity:store", _this.store, _this);
  },

  store: function(data) {
    $.post("/api/activities", data)
    .then( function(res) {
      console.log(res);
      pubsub.trigger('activity:stored', res);
    });
  }
});