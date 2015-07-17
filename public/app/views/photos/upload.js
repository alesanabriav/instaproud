'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var urls = require('config/urls');
var alertify = require('alertifyjs');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  //listen events
  initialize: function() {
    var _this = this;

    this.listenTo(pubsub, 'view:remove', _this.remove);
    this.listenTo(pubsub, 'photo:upload', _this.upload);
  },

  upload: function(data) {
    var img = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];

    $.ajax({
      url: urls.baseUrl + '/api/photos/upload',
      type: 'POST',
      data: {img: img}
    })
    .then(function(data) {
      var src = data.original;
      pubsub.trigger('navigator:change', 'filter/' + src);
    });

  }

});
