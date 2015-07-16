"use strict";
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var template = require('templates/photos/caption.hbs');
var urls = require('config/urls');
var alertify = require('alertifyjs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    "focusout .caption": "store",
    "click .tagged-remove": "removeTagged",
    "keydown .autocomplete": "autocomplete",
    "click .get-geolocation": "getGeolocation"
  },

  //Start Listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(_this.model, "change", _this.render, _this);
    _this.listenTo(pubsub, "view:remove", _this.remove, _this);
    _this.listenTo(pubsub, "caption:render", _this.render, _this);
    _this.listenTo(pubsub, 'photo:tagged', _this.update, _this);
    _this.listenTo(pubsub, "app:next", _this.show, _this);
  },

  update: function(data) {
    this.model.set(data);
  },

  render: function() {
    $('.preloader').addClass('hidden');
    var _this = this;
    _this.$el
    .empty()
    .append( template( _this.model.toJSON() ) );
    return _this;
  },

  store: function() {
    var id = this.model.id;
    var data = {caption: $('.caption').val()};

    $.ajax({
      url: urls.baseUrl+'/api/photos/'+id,
      method: "PUT",
      data: data
    })
    .then(function(res) {
      console.log(res)
    });
  },

  show: function() {
    pubsub.trigger('navigator:change', '/');
  },

  autocomplete: function(e) {
    var query = $(e.currentTarget).val();

    if (query.length) {
      $.ajax({
        url: urls.baseUrl+"/users/search/"+ query,
        method: "GET"
      })
      .then(function(res) {
        pubsub.trigger('autocomplete:render', res);
      });
    };
  },

  getGeolocation: function(e) {
    e.preventDefault();

    var _this = this;
    var id = _this.model.id;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        _this.storeGeolocation(position, id);
      });
    } else {
      alertify.error('Geolocalización no es soportada por este navegador');
    }
  },

  storeGeolocation: function(position, id) {
    var geolocation = {
      geolocation: {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      }
    };

    $.ajax({
      url: urls.baseUrl+'/api/photos/'+id,
      method: "PUT",
      data: JSON.stringify(geolocation)
    })
    .then(function(res) {
      console.log(res)
    });
  },

  removeTagged: function(e) {
    var $el =  $(e.currentTarget);
    var userId = $el.data('user');

    var data = {"tagged": userId};

    $.post(urls.baseUrl + '/api/photos/' + this.model.id + '/untagged', data)
    .then(function() {
      $el.remove();
    });

  }

});
