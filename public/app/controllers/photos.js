var PhotoUpload = require('views/photos/upload');
var PhotoRender = require('views/photos/render');
var PhotoCrop = require('views/photos/crop');
var PhotoFilter = require('views/photos/filter');
//Utils
var pubsub = require('utils/pubsub');

module.exports = {
  initialize: function() {

  },

  upload: function() {
    return new PhotoUpload();
  },

  render: function() {
    return new PhotoRender();
  },

  crop: function() {
    return new PhotoCrop();
  },

  filter: function(src) {
    var data;
    new PhotoFilter();
    data = {"original": src};
    pubsub.trigger("photo:uploaded", data);
  }

 }
