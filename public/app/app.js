var $ = require('jquery');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
Backbone.$ = $;

var Router = require('./router');
var router = new Router();
Backbone.history.start();

var Navigator = {
  
  initialize: function() {
    pubsub.on('navigator:change', this.trigger, this);
  },

  trigger: function(url) {
    router.navigate(url, {trigger: true, replace: true});
  }

}

Navigator.initialize();