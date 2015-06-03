//Dependencies
global.jQuery = require("jquery");
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');

//Utils
var pubsub = require('utils/pubsub');
//Templates
var templateItem = require('templates/photos/item.hbs');
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
    _this.listenTo(pubsub, "photo:update", _this.remove, _this);
    _this.listenTo(_this.model, "change", _this.render, _this);
  },

  update: function(data) {
    this.model.set(data);
  },

  render: function() {
    var _this = this;
    var template = templateItem( _this.model.toJSON() );
    _this.$el.empty();
    _this.$el.append(template);
    _this.$el.find('span.timeago').timeago();
    return _this;
  },

  like: function(e) {
    e.preventDefault();
    var _this = this;
    var heart = $(e.currentTarget);
    heart.find('i').removeClass('fa-heart-o');
    heart.find('i').addClass('fa-heart');
    heart.find('i').addClass('animated jello');
    
    $.post('/photos/'+ _this.model.id  +'/liked', function(res) {
      _this.model.set("liked", res.liked);
    });
  },

  unlike: function(e) {
    e.preventDefault();
    var _this = this;
    var heart = $(e.currentTarget);
    heart.find('i').removeClass('fa-heart-o');
    heart.find('i').addClass('fa-heart');
    heart.find('i').addClass('animated jello');
    
    $.post('/photos/'+ _this.model.id +'/unliked', function(res) {
      _this.model.set("liked", res.liked);
    });
  },

  comment: function(e) {
    e.preventDefault();
    var _this = this;
    var comment = $(e.currentTarget).closest('.commenter').find('.commentText').val();
    var comments;

    $.post('/photos/'+ _this.model.id + '/comments', {comment: comment}, function(res) {
      comments = _this.model.get('comments');
      comments.push(res);
      _this.model.set("comments", comments);
      _this.model.trigger('change');
    });
  }

});


//each image should have name of the filter 