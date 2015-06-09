"use strict";
//Dependencies
global.jQuery = require("jquery");
var $ = jQuery;
var Backbone = require("backbone");
var _ = require("underscore");

//Utils
var pubsub = require("utils/pubsub");

Backbone.$ = $;

module.exports = Backbone.View.extend({

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "photo:comment", _this.comment, _this);
  },

  comment: function(data) {
    data.el.preventDefault();
    var comment = $(data.el.currentTarget).closest('.commenter').find('.commentText').val();
    var comments;

    $.post('/api/photos/'+ data.model.id + '/comments', {comment: comment})
    .then(function(res) {
      pubsub.trigger('photo:addComment', {photo: data.model,  comment: res});
    });
  }

});