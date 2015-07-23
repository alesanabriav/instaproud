'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var template = require('templates/photos/caption.hbs');
var urls = require('config/urls');
var alertify = require('alertifyjs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'focusout .caption': 'store',
    'click .tagged-remove': 'removeTagged',
    'keydown .autocomplete': 'autocomplete',
    'click .get-geolocation': 'getGeolocation'
  },

  //Start Listen events
  initialize: function() {
    this.listenTo(this.model, 'change', this.render, this);
    this.listenTo(pubsub, 'view:remove', this.remove, this);
    this.listenTo(pubsub, 'caption:render', this.render, this);
    this.listenTo(pubsub, 'photo:tagged', this.update, this);
    this.listenTo(pubsub, 'app:next', this.show, this);
  },

  update: function(data) {
    this.model.set(data);
  },

  render: function() {
    this.$el
    .empty()
    .append( template( this.model.toJSON() ) );
    return this;
  },

  store: function() {
    var id = this.model.id;
    var data = {caption: this.$('.caption').val()};

    $.ajax({
      url: urls.baseUrl + '/api/photos/' + id,
      method: 'PUT',
      data: data
    })
    .then(function(res) {
      console.log(res);
    });
  },

  show: function() {
    this.store();
    pubsub.trigger('navigator:change', '/');
  },

  autocomplete: function(e) {
    var query = $(e.currentTarget).val();

    if (query.length) {
      $.ajax({
        url: urls.baseUrl + '/users/search/' + query,
        method: 'GET'
      })
      .then(function(res) {
        pubsub.trigger('autocomplete:render', res);
      });
    }
  },

  getGeolocation: function(e) {
    e.preventDefault();
    var _this = this;
    var id = _this.model.id;

    if (navigator.geolocation) {
      this.$('.location-name').text('Agregando...');
      navigator.geolocation.getCurrentPosition(function(position) {
        _this.storeGeolocation(position, id);
      });
    } else {
      alertify.error('Geolocalización no es soportada por este navegador');
    }
  },

  storeGeolocation: function(position, id) {
    var $locationStatus = this.$('.location-name');
    var locationData = {};
    locationData.longitude = position.coords.longitude;
    locationData.latitude = position.coords.latitude;

    $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + locationData.latitude + ',' + locationData.longitude + '&key=AIzaSyDvIcrhqw1Zt09CL-Z-SBKomCkdQT9q8n8')
    .then(function(res) {
      locationData.address = res.results[0].formatted_address;
      locationData.name = res.results[0].address_components[2].short_name;
      $locationStatus.text(locationData.name);

        $.ajax({
        url: urls.baseUrl + '/api/photos/' + id,
        method: 'PUT',
        dataType: 'json',
        data: {'geolocation': JSON.stringify(locationData)}
        })
        .then(function(res) {
          alertify.success('Localización agregada');
        });
    });
  },

  removeTagged: function(e) {
    if (e) e.preventDefault();
    var $el = this.$(e.currentTarget);
    var userId = $el.data('user');

    var data = {'tagged': userId};

    $.post(urls.baseUrl + '/api/photos/' + this.model.id + '/untagged', data)
    .then(function() {
      $el.remove();
    });

  }

});
