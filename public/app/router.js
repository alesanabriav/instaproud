//Dependencies
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

//Controllers
var AppNavController = require('controllers/app');
var photosController = require('controllers/photos');

module.exports = Backbone.Router.extend({
  routes: {
    '': "feed",
  },

  initialize: function(){
    AppNavController.initialize();
  
    photosController.upload();
    photosController.render();
    photosController.crop();
    photosController.filter();
  },

  feed: function() {

  }

});