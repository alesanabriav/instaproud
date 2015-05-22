//Dependencies
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

//Utils
var pubsub = require('utils/pubsub');

//Controllers
var AppNavController = require('controllers/app');
var photosController = require('controllers/photos');

module.exports = Backbone.Router.extend({
  routes: {
    '': "feed",
    'filter/:src': "filters",
  },

  /**
   * execute appropriate method when the url match
   * @params callback, args, name
   */
  execute: function(callback, args, name) {
    if (callback) callback.apply(this, args);
  },

  initialize: function(){
    AppNavController.initialize();
    photosController.render();
    photosController.crop();
    photosController.upload();
  },

  feed: function() {

  },

  filters: function(src) {
    pubsub.trigger('view:remove');
    photosController.filter(src);
  }

});