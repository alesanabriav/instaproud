//Dependencies
global.jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
var pubsub = require('utils/pubsub');
var cropper = require('cropper');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  //Start Listen events
  initialize: function() {
    var _this = this;
    
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "photo:crop", _this.startCrop, _this);
    _this.listenTo(pubsub, "app:next", _this.sendCrop, _this);
    _this.data = '';
  },

  startCrop: function() {
    var image;
    var _this = this;
    var data;
    var $container = $('#app-container');
    var $img = $container.find('img');
    
    $container.append('<canvas width="500" height="500" class="hidden" />');

    var canvas = $container.find('canvas').get(0);
    var context = canvas.getContext("2d");

    $img.cropper({
      minCropBoxWidth: 1000,
      minCropBoxHeight: 1000,
      responsive: false,
      aspectRatio: 1,
      resizable: false,
      strict: true,
      movable: false,
      dragCrop: false,

      crop: function(data) {
        image = $img.get(0);
        context.drawImage(image, data.x, data.y, data.width, data.height, 0, 0, 500, 500);
        _this.data = canvas.toDataURL();
      },

      built: function () {
        $(this).cropper('zoom', 2);
        $(this).cropper('setCropBoxData',{width: '100%'});
      }
    });
    
    pubsub.trigger('footerNav:remove');
    pubsub.trigger('appHeader:showNext');
    $('.preloader').addClass('hidden');

  },

  sendCrop: function() {
    pubsub.trigger("photo:upload", this.data);
  }
});