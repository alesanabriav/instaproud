'use strict';
var pubsub = require('utils/pubsub');

module.exports = function(router) {
  return {
    initialize: function() {
      pubsub.on('navigator:change', this.trigger, this);
    },

    trigger: function(url) {
      router.navigate(url, {trigger: true});
    }
  };
};
