//Dependencies
global.jQuery = require('jquery');
var $ = global.jQuery;
var _ = require('underscore');
var Backbone = require('backbone');

var pubsub = require('utils/pubsub');

var templateEdit = require('templates/profile/edit.hbs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'change .uploadPhoto': 'uploadImg',
    'submit form': 'stopSubmit'
  },

  //listen events
  initialize: function() {
    var _this = this;
    _this.listenTo(pubsub, 'view:remove', _this.remove, _this);
    _this.listenTo(_this.model, 'change', _this.render, _this);
    _this.listenTo(pubsub, 'app:next', _this.next, _this);
  },

  stopSubmit: function(e) {
    e.preventDefault();
  },

  //Render form
  render: function() {
    var _this = this;
    var data;

    if (_this.model.get('birthday')) {
      data = _.extend(_this.parseDate(), _this.model.toJSON() );
    } else {
      data = _this.model.toJSON();
    }
    console.log(_this.getYears());
    var template = templateEdit( _.extend( data, _this.getYears(), _this.getDays() ) );
    _this.$el.empty().append(template);
    $("#app-container").empty().append(_this.el);
    return _this;
  },

  getDays: function() {
    var i;
    var days = [];

    for(i = 1; i <= 31; i++) {
      days.push(i);
    }

    return {days: days};
  },

  getYears: function() {
    var i;
    var years = [];

    for(i = 1905; i <= 1999; i++) {
      years.push(i);
    }

    return {years: years.sort(function(a, b){return b-a})};
  },

  parseDate: function() {
    var _this = this;
    var date = _this.model.get('birthday').split('-');
    var year = date[0];
    var month = date[1];
    var day = date[1].split('T')[0];

    return {
      year: year,
      month: month,
      day: day
    };
  },

  store: function(data, cb) {
    var _this = this;

    $.ajax({
      url: "/users/"+_this.model.id,
      method: "PUT",
      data: data
    })
    .then(function(res) {
      return cb(res);
    })
  },

  uploadImg: function(e) {
    var _this = this;
    var $file = $(e.currentTarget)[0].files[0];
    formData = new FormData();
    formData.append("profile_image", $file);
    var id = _this.model.id;

    $.ajax({
      url: '/users/'+ id +'/image',
      type: 'POST',
      data: formData,
      processData: false, //Avoid be processed by jquery
      contentType: false, //Not set any content type header
    })
    .then(function(res) {
      _this.model.set("profile_image", res.profile_image);
    });

  },

  next: function() {
    var $form = this.$el.find('form');
    var $name = $form.find('input[name="name"]').val();
    var $gender = $form.find('select[name="gender"]').val();
    var $day = $form.find('select[name="day"]').val();
    var $month = $form.find('select[name="month"]').val();
    var $year = $form.find('select[name="year"]').val();
    var $area = $form.find('select[name="area"]').val();
    var $bio = $form.find('textarea[name="bio"]').val();

    var data = {
      name: $name,
      gender: $gender,
      birthday: $year+"-"+$month+"-"+$day,
      area: $area,
      bio: $bio
    };

    this.store(data, function(res) {
      pubsub.trigger('navigator:change', '/');
    });


  }
});