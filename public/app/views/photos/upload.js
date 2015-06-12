"use strict";
var $ = require('jquery');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var urls = require('config/urls');

Backbone.$ = $;

module.exports = Backbone.View.extend({

  //listen events
  initialize: function() {
    var _this = this;

    this.listenTo(pubsub, "view:remove", _this.remove);
    this.listenTo(pubsub, "photo:upload", _this.upload);
  },

  upload: function(data) {
    var d = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var img = encodeURIComponent(d);

    $.ajax({
      url: urls.baseUrl+'/api/photos/upload',
      type: 'POST',
      data: {img: d[2]},
      beforeSend: function() {
        $('.preloader').removeClass('hidden');
      }
    })
    .then(function(data) {
      var src = data.original;
      pubsub.trigger('navigator:change', 'filter/'+src);
      $('.preloader').addClass('hidden');
    });

  }

});