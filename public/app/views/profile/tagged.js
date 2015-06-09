"use strict";

var $ = require("jquery");
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var template = require('templates/profile/tagged.hbs');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'click .image-open': 'open',
  },

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "profileTagged:render", _this.render, _this);
  },

  pull: function(username) {
    $.get('/api/users/'+ username +'/tagged')
    .then(function(res) {
      pubsub.trigger("profileTagged:render", res);
    });
  },

  render: function(data) {
    var _this = this;
    _this.$el.empty();
    _this.$el.append(template( data ));
    $("#app-container").html(_this.$el);
    return _this;
  }

});