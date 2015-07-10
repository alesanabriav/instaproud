"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var cropper = require('cropper');
var pubsub = require('utils/pubsub');

Backbone.$ = $;

module.exports = Backbone.View.extend({

  //Start Listen events
  initialize: function() {
    var _this = this;

    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "photo:crop", _this.startCrop, _this);
    _this.listenTo(pubsub, "app:next", _this.sendCrop, _this);
    _this.listenTo(pubsub, "cropper:rotate", _this.rotate, _this);
    _this.data = '';
    _this.cropper;
  },

  startCrop: function() {
    var _this = this;
    var $container = $('#app-container');
    var $img = $container.find('img');
    var image;
    var data;
    var context;
    var storagedImage;
    // storagedImage = localStorage.getItem('imageToCrop');

    // if ($img.attr('src') === undefined) {
    //   $container.append('<img src="'+ storagedImage +'" class="hidden" />');
    // };

    $container.find('img').cropper({
      minCropBoxWidth: 500,
      minCropBoxHeight: 500,
      responsive: false,
      aspectRatio: 1,
      resizable: false,
      strict: true,
      movable: false,
      dragCrop: false,

      crop: function(data) {
        // image = $container.find('img').get(0);
        // context.rotate(parseInt(data.rotate) * Math.PI / 180);
        // context.drawImage(image, data.x, data.y, data.width, data.width, 0, 0, 500, 500);

        _this.data = $(this).cropper('getCroppedCanvas').toDataURL();
      },

      built: function () {
        _this.cropper = this;
        $(this).cropper('setCropBoxData',{width: '100%'});
        $('.preloader').addClass('hidden');
      }
    });

    pubsub.trigger("appHeader:showRotate");
  },

  rotate: function() {
    $(this.cropper).cropper('rotate', 90);
  },

  sendCrop: function() {
    pubsub.trigger("photo:upload", this.data);
  }
});