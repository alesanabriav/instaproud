//Dependencies
global.jQuery = require("jquery");
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');

//Utils
var pubsub = require('utils/pubsub');

Backbone.$ = $;

module.exports = Backbone.View.extend({

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "photo:like", _this.like, _this);
    _this.listenTo(pubsub, "photo:unlike", _this.unlike, _this);
  },

  like: function(e) {
    e.preventDefault();
    var _this = this;
    var heart = $(e.currentTarget);
    heart.find('i').removeClass('fa-heart-o');
    heart.find('i').addClass('fa-heart');
    heart.find('i').addClass('animated jello');
    
    $.post('/photos/'+ _this.model.id  +'/liked', function(res) {
      _this.model.set({liked: res.liked});
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
      _this.model.set({liked: res.liked});
    });
  },


});


//each image should have name of the filter 