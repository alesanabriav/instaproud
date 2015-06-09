"use strict";

var $ = require("jquery");
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
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
    _this.$el.empty();
    _this.$el.append( template( _this.model.toJSON() ) );
    _this.$el.find('span.timeago').timeago();
    return _this;
  },

  like: function(e) {
    var _this = this;
    var $icon = $(e.currentTarget).find('i');

    $icon
    .removeClass('fa-heart-o')
    .addClass('fa-heart')
    .addClass('animated jello');

    $.post('/api/photos/'+ _this.model.id  +'/liked')
    .then(_this.update.bind(_this));
  },

  unlike: function(e) {
    var _this = this;
    var $icon = $(e.currentTarget).find('i');

    $icon
    .removeClass('fa-heart-o')
    .addClass('fa-heart')
    .addClass('animated jello');

    $.post('/api/photos/'+ _this.model.id +'/unliked')
    .then(_this.update.bind(_this));
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

  updateComments: function(comment) {
    console.log(this);
    var _this = this;
    var comments = _this.model.get('comments');
    comments.push(comment);
    _this.model.set("comments", comments);
    _this.model.trigger('change');
  }

});
