'use strict';
global.jQuery = require('jquery');
var $ = jQuery;
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var loadTimeago = require('utils/timeago');
var template = require('templates/photos/item.hbs');
var urls = require('config/urls');
var loadImages = require('utils/loadImages');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'click .like': 'like',
    'click .unlike': 'unlike',
    'click .comment': 'comment',
    'keyup .commentText': 'checkEnter',
    'click .commentText': 'commentFocus',
    'focusout .commentText': 'commentFocusOut'
  },

  //Start Listen events
  initialize: function() {
    this.listenTo(pubsub, 'view:remove', this.remove, this);
    this.listenTo(this.model, 'change', this.render, this);
  },

  render: function() {
    this.$el
    .empty()
    .append( template( this.model.toJSON() ) );
    loadTimeago(this.$el);
    return this;
  },

  like: function(e) {
    var _this = this;
    var $icon = $(e.currentTarget).find('i');

    $.post(urls.baseUrl + '/api/photos/' + _this.model.id  + '/liked')
    .then(function(res) {
      _this.model.set('liked', res.liked);
      pubsub.trigger('activity:store', {text: 'le gusta', photo: _this.model.id});
    });
  },

  unlike: function(e) {
    var _this = this;
    var $icon = $(e.currentTarget).find('i');

    $.post(urls.baseUrl + '/api/photos/' + _this.model.id + '/unliked')
    .then(function(res) {
      _this.model.set('liked', res.liked);
    });
  },

  commentFocus: function(e) {
    e.preventDefault();
    this.$el.find('.commentText').focus();
    pubsub.trigger('input:onFocus');
  },

  commentFocusOut: function() {
    pubsub.trigger('input:onFocusOut');
  },

  checkEnter: function(e) {
    var $icon = this.$el.find('.comment > i');
    $icon.removeClass('fa-paper-plane-o');
    $icon.addClass('fa-paper-plane');

    if (e.keyCode === 13) {
      this.comment(e);
    }
  },

  comment: function(e) {
    e.preventDefault();
    var comment = this.$el.find('.commentText').val();
    pubsub.trigger('input:onFocusOut');
    $.post(urls.baseUrl + '/api/photos/' + this.model.id + '/comments', {comment: comment})
    .then(this.updateComments.bind(this));
  },

  //search first the model then set
  update: function(data) {
    this.model.set(data);
  },

  updateComments: function(data) {
    var comments = this.model.get('comments');
    comments.push(data);
    this.model.set('comments', comments);
    this.model.trigger('change');
    pubsub.trigger('activity:store', {text: 'comento', photo: this.model.id});
  }

});
