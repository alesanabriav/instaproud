'use strict';
global.jQuery = require('jquery');
var $ = jQuery;
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
    loadImages();
    return this;
  },

  like: function(e) {
    e.preventDefault();
    $.post(urls.baseUrl + '/api/photos/' + this.model.id + '/liked')
    .then(function(res) {
      this.model.set('liked', res.liked);
      pubsub.trigger('activity:store', {text: 'le gusta', photo: this.model.id});
    }.bind(this));
  },

  unlike: function(e) {
    e.preventDefault();
    $.post(urls.baseUrl + '/api/photos/' + this.model.id + '/unliked')
    .then(function(res) {
      this.model.set('liked', res.liked);
    }.bind(this));
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
