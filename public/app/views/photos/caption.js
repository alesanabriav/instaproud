//Dependencies
global.jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
var imagesloaded = require('imagesloaded');
//Utils
var pubsub = require('utils/pubsub');

Backbone.$ = $;

// Templates
var templateCaption = require('templates/photos/caption.hbs')

module.exports = Backbone.View.extend({
  events: {
    "focusout .caption": "store"
  },
  
  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(_this.model, "change", _this.render, _this);
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "caption:render", _this.render, _this);
    _this.listenTo(pubsub, "app:next", _this.show, _this);
  },

  render: function() {
    pubsub.trigger('footerNav:remove');
    var template = templateCaption( this.model.toJSON() );
    var $el = $(this.el);
    $el.html(template);
    $("#app-container").html($el);
     pubsub.trigger('appHeader:showNext');
  },

  store: function() {
    var id = this.model.id;
    var data = {caption: $('.caption').val()};

    $.ajax({
      url: '/photos/'+id,
      method: "PUT",
      data: data
    })
    .then(function(res) {
      console.log(res)
    });
  },

  show: function() {
    pubsub.trigger('navigator:change', '/');
  }


});


//each image should have name of the filter 