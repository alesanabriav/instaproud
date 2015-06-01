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
    'click .comment': 'comment'
  },
  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
  },

  render: function() {
    var _this = this;
    var template = templateItem( _this.model.toJSON() );
    var $el = $(_this.el);
    $el.html(template);
    return _this;
  },

  like: function(e) {
    e.preventDefault();
    var heart = $(e.currentTarget);
    heart.find('i').removeClass('fa-heart-o');
    heart.find('i').addClass('fa-heart');
    console.log(heart);
  },

  comment: function(e) {
    e.preventDefault();
    var comment = $(e.currentTarget).parent().find('input');
    console.log(comment);
  }

});


//each image should have name of the filter 