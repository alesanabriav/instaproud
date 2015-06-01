//Dependencies
global.jQuery = require('jquery');
var $ = global.jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
var imagesloaded = require('imagesloaded');
//Utils
var pubsub = require('utils/pubsub');
//Templates
var templateEdit = require('templates/profile/edit.hbs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'focusout input': 'store',
    'focusout textarea': 'store',
    'change select': 'store',
    'change .uploadPhoto': 'uploadImg'
  },

  //listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, 'view:remove', _this.remove, _this);
    _this.listenTo(_this.model, 'change', _this.render, _this);
    _this.listenTo(pubsub, 'app:next', _this.next, _this);

  },

  //Render form
  render: function() {
    var _this = this;
    var template = templateEdit( _this.model.toJSON() );
    $(_this.el).html(template);
    $("#app-container").html(_this.el);
    return _this;
  },

  store: function(e) {
    var $input = $(e.currentTarget);
    var nameAttr = $input.attr('name');
    var val = $input.val();
    var data = {};
    data[nameAttr] = val;
  },
  
  uploadImg: function(e) {
    var $file = $(e.currentTarget)[0].files[0];
    formData = new FormData();
    formData.append("profile_image", $file);
    var id = this.model.id;

    $.ajax({
      url: '/users/'+ id +'/image',
      type: 'POST',
      data: formData,
      processData: false, //Avoid be processed by jquery
      contentType: false, //Not set any content type header
    })
    .then(function(res) {

    });

  },

  next: function() {
    pubsub.trigger('navigator:change', '/');
  }
});