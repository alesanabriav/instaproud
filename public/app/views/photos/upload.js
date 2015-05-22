//Dependencies
global.jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var imagesloaded = require('imagesloaded');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  //listen events
  initialize: function() {
    var _this = this;
    
    this.listenTo(pubsub, "view:remove", _this.remove);
    this.listenTo(pubsub, "photo:upload", _this.upload);
  },

  //Upload photo to server
  upload: function(data) {
    var d = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var img = encodeURIComponent(d);

    options = {
      url: '/photos/',
      type: 'POST',
      data: {img: d[2]},
      beforeSend: function showPreloader() {
        $('.preloader').removeClass('hidden');
      }
    };

    ajx = $.ajax(options);

    ajx.then(function(data) {
      var src = data.original;
      pubsub.trigger('navigator:change', 'filter/'+src);
      $('.preloader').addClass('hidden');
    });
  }


});