//Dependencies
global.jQuery = require("jquery");
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
var timeago = require('timeago');
var pubsub = require('utils/pubsub');
Backbone.$ = $;

// Views
var itemView = require('views/photos/item');

module.exports = Backbone.View.extend({
  events: {
    "click .store": "store",
    "keydown .autocomplete": "autocomplete"
  },
  
  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(_this.collection, 'reset', _this.render);
  },

  render: function() {
    var _this = this;
    var views = [];
    var view;

    _this.collection.each(function(model) {
      view = new itemView({model: model});
      views.push(view.render().el);
    });
    $(_this.el).html(views);
    $("#app-container").html(_this.el);
  },

});


//each image should have name of the filter 