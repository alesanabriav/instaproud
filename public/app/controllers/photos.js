//Views
var Photos = require('views/photos/list');
var PhotoUpload = require('views/photos/upload');
var PhotoRender = require('views/photos/render');
var PhotoCrop = require('views/photos/crop');
var PhotoFilter = require('views/photos/filter');
var PhotoCaption = require('views/photos/caption');
var PhotoTag = require('views/photos/tag');
var PhotoAutocomplete = require('views/photos/autocomplete');

//Models
var models = require('models/photo');

//Utils
var pubsub = require('utils/pubsub');

module.exports = {
  initialize: function() {

  },

  list: function() {
    var collection = new models.photos();
    new Photos({collection: collection});
    collection.fetch({reset: true});
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

    var headerData = {title: "Editar Imagen", bgColor: "444"};
    pubsub.trigger('appHeader:change', headerData);
    pubsub.trigger('footerNav:remove');
    pubsub.trigger('appHeader:showNext');
    var data;
    var folder = src.split("_");
    new PhotoFilter();
    data = {"original": src, "folder": folder[0]};
    pubsub.trigger("photo:uploaded", data);
  },
 
  caption: function(id) {
    photo = new models.photo({id: id});
    new PhotoCaption({model: photo});
    photo.fetch();
  },

  tag: function(id) {
    photo = new models.photo({id: id});
    new PhotoTag({model: photo});
    photo.fetch();
  },

  autocomplete: function(id) {
    photo = new models.photo({id: id});
    return new PhotoAutocomplete({model: photo});
    photo.fetch();
  }

 }
