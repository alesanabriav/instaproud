var PhotoUpload = require('views/photos/upload');
var PhotoRender = require('views/photos/render');
var PhotoCrop = require('views/photos/crop');
var PhotoFilter = require('views/photos/filter');

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

  filter: function() {
    return new PhotoFilter();
  }

 }
