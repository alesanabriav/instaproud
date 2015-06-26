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
    _this.data = '';
  },

  startCrop: function() {
    var _this = this;
    var $container = $('#app-container');
    var $img = $container.find('img');
    var image;
    var data;
    var canvas;
    var context;
    var storagedImage;

    $container.append('<canvas width="500" height="500" class="hidden" />');
    $container.css("height", "100%");

    canvas = $container.find('canvas').get(0);
    context = canvas.getContext("2d");
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
        image = $container.find('img').get(0);
        context.drawImage(image, data.x, data.y, data.width, data.height, 0, 0, 500, 500);
        _this.data = canvas.toDataURL();
      },

      built: function () {
        $(this).cropper('zoom', 1);
        $(this).cropper('setCropBoxData',{width: '100%'});
        $('.preloader').addClass('hidden');
      }
    });
  },

  sendCrop: function() {
    pubsub.trigger("photo:upload", this.data);
  }
});