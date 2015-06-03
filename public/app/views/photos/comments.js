//Dependencies
global.jQuery = require("jquery");
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');

//Utils
var pubsub = require('utils/pubsub');
//Templates

var templateComment = require('templates/photos/comment.hbs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
 
  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "photo:comment", _this.remove, _this);
    _this.listenTo(_this.collection, "change", _this.render, _this);
  },

  update: function(data) {
    this.collection.set(data);
  },

  render: function() {
    var _this = this;
    var html = [];
    var template;

    _this.collection.each(function(model) {
      template = templateComment( _this.model.toJSON() );
      html.push(template);
    });

    _this.$el.empty();
    _this.$el.append(html);
    return _this;
  },

  comment: function(e) {
    e.preventDefault();
    
  }

});


//each image should have name of the filter 