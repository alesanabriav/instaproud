//Dependencies
global.jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;
var pubsub = require('utils/pubsub');
var guillotine = require('jquery-guillotine');

module.exports = Backbone.View.extend({

  //Start Listen events
  initialize: function() {
    pubsub.on("photo:crop", this.startCrop, this);
    pubsub.on("app:next", this.sendCrop, this);
  },

  startCrop: function(picture) {
    picture.guillotine({width: 500, });
    picture.guillotine('center');
    picture.guillotine('fit');
  },

  sendCrop: function() {
    var picture = $("#app-container").find('img');

    var data = picture.guillotine('getData');

    $("#app-container").append("<canvas width='500' height='500' />");

    var canvas = $("#app-container").find('canvas').get(0);
    var element = canvas.getContext("2d");

    var image = picture.get(0);
    var theImage = new Image();
    theImage.src = $(image).attr("src");
    
    var imageWidth = theImage.width;
    var imageHeight = theImage.height;
   
    var sX = imageWidth / 1000;
    var sY = imageHeight / $(picture).height();

    var ratioX = imageWidth / sX;
    var ratioY = imageHeight / sY;

    var sourceX = (data.x * ratioX);
    var sourceY = (data.y * ratioY);

    var W = 500 * ratioX;
    var H = 500 * ratioY;

    element.scale(data.scale, data.scale);

    element.drawImage(image, sourceX, sourceY, 0, 0, 500, 500);

    var data = canvas.toDataURL( 'image/jpg' );

    pubsub.trigger("photo:upload", data);

  }
});