'use strict';
global.jQuery = require('jquery');
var $ = global.jQuery;
var _ = require('underscore');
var Backbone = require('backbone');
var pubsub = require('utils/pubsub');
var getInterval = require('utils/get_interval');
var uploadFile = require('utils/upload_file');
var parseDate = require('utils/parse_date');
var alertify = require('alertifyjs');
var templateEdit = require('templates/profile/edit.hbs');
var urls = require('config/urls');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'change .uploadPhoto': 'getProfileImage',
    'submit form': 'stopSubmit'
  },

  /** listen events */
  initialize: function() {
    this.listenTo(pubsub, 'view:remove', this.remove, this);
    this.listenTo(this.model, 'change', this.render, this);
    this.listenTo(pubsub, 'app:next', this.getUserData, this);
  },

  /** stop submit propagate event */
  stopSubmit: function(e) {
    e.preventDefault();
  },

  /** merge years, days and data */
  mergeData: function(data) {
    var years = {
      years: getInterval(1905, 1999, true)
    };

    var days = {
      days: getInterval(1, 31)
    };

    return _.extend( data, years, days );
  },

  /**
   * attach template with data
   * @return {object} this
   */
  render: function() {
    var data;

    /** if user has birthday merge birthday parsed with model */
    if (this.model && this.model.get('birthday')) {
      data = _.extend(
        parseDate(this.model.get('birthday')),
        this.model.toJSON()
        );
    } else {
      data = this.model.toJSON();
    }

    this.$el
    .empty()
    .append(templateEdit( this.mergeData(data) ));

    $('#app-container')
    .empty()
    .append(this.el);

    return this;
  },

  /**
   * store user data
   * @param  {object}   data - user data
   * @param  {Function} cb   - callback
   * @return {Function} callback
   */
  update: function(data, cb) {
    $.ajax({
      url: urls.baseUrl + '/users/' + this.model.id,
      method: 'PUT',
      data: data
    })
    .then(function(res) {
      return cb(res);
    });
  },

  /**
   * get file from input
   * @param  {object} e jquery event
   * @return {Function}  execute uploadProfileImage
   */
  getProfileImage: function(e) {
    var $file = $(e.currentTarget)[0].files[0];
    this.uploadProfileImage($file);
  },

  /**
   * Upload file and show it
   * @param {file} file - profile image
   * @return {Function}  execute uploadFile module
   */
  uploadProfileImage: function(file) {
    var id = this.model.id;
    var $profileImage = $('.profile-image').find('img');
    var name = 'profile_image';
    var url = '/users/' + id + '/image';

    return uploadFile(file, name, url, function(res) {
      $profileImage.attr('src', urls.s3Bucket + '/' + res.id + '/' + res.profile_image);
    });
  },

  /** validate birthday is not empty */
  validateBirthday: function(day, month, year) {
    if (day === '' || month === '' || year === '') {
      return alertify.error('Fecha requerida');
    }
  },

  /** validate field is not empty */
  validateNotEmpty: function(field, name) {
    if (field === '') {
      return alertify.error(name + ' requerido');
    }
  },

  /**
   * get user data from user form
   * @return {Function} execute update
   */
  getUserData: function() {
    var data;
    var $form = this.$el.find('form');
    var $name = $form.find('input[name="name"]').val();
    var $gender = $form.find('select[name="gender"]').val();
    var $day = $form.find('select[name="day"]').val();
    var $month = $form.find('select[name="month"]').val();
    var $year = $form.find('select[name="year"]').val();
    var $area = $form.find('select[name="area"]').val();
    var $bio = $form.find('textarea[name="bio"]').val();

    this.validateNotEmpty($name, 'Nombre');
    this.validateNotEmpty($area, 'Seleccionar Areá');
    this.validateBirthday($day, $month, $year);

    data = {
      name: $name,
      gender: $gender,
      birthday: $year + '-' + $month + '-' + $day,
      area: $area,
      bio: $bio
    };

    return this.update(data, function() {
      pubsub.trigger('navigator:change', '/');
    });
  }
});
