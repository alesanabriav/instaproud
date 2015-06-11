"use strict";
global.jQuery = require("jquery");
var $ = jQuery;
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var loadTimeago = require('utils/timeago');
var template = require('templates/photos/item.hbs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'click .like': 'like',
    'click .unlike': 'unlike',
    'click .comment': 'comment'
  },

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(_this.model, "change", _this.render, _this);
  },

  render: function() {
    var _this = this;
    _this.$el
    .empty()
    .append( template( _this.model.toJSON() ) );
    loadTimeago(_this.$el);
    return _this;
  },

  like: function(e) {
    var _this = this;
    var $icon = $(e.currentTarget).find('i');


    $.post('/api/photos/'+ _this.model.id  +'/liked')
    .then(function(res) {
      _this.model.set('liked', res.liked);
      pubsub.trigger('activity:store', {text: "le gusta", photo: _this.model.id});
    });
  },

  unlike: function(e) {
    var _this = this;
    var $icon = $(e.currentTarget).find('i');

    $.post('/api/photos/'+ _this.model.id +'/unliked')
    .then(function(res) {
      _this.model.set('liked', res.liked);

    });
  },

  comment: function(e) {
    e.preventDefault();
    var comments;
    var _this = this;
    var comment = $(e.currentTarget)
    .closest('.commenter')
    .find('.commentText').val();

    $.post('/api/photos/'+ _this.model.id + '/comments', {comment: comment})
    .then(_this.updateComments.bind(_this));
  },

  //search first the model then set
  update: function(data) {
    this.model.set(data);
  },

  updateComments: function(data) {
    var _this = this;
    var comments = _this.model.get('comments');
    comments.push(data);
    _this.model.set("comments", comments);
    _this.model.trigger('change');
    pubsub.trigger('activity:store', {text: "comento", photo: _this.model.id});
  }

});
