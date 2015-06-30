//Dependencies
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
      data = _.extend(
        parseDate(_this.model.get('birthday')),
        _this.model.toJSON()
        );
    } else {
      data = _this.model.toJSON();
    }

    var years = {
      years: getInterval(1905, 1999, true)
    };

    var days = {
      days: getInterval(1, 31)
    };

    var template = templateEdit( _.extend( data, years, days ) );

    _this.$el.empty().append(template);

    $("#app-container").empty().append(_this.el);

    return _this;
  },

  store: function(data, cb) {
    var _this = this;

    $.ajax({
      url: urls.baseUrl+"/users/"+_this.model.id,
      method: "PUT",
      data: data
    })
    .then(function(res) {
      return cb(res);
    })
  },

  uploadImg: function(e) {
    var _this = this;
    var id = _this.model.id;
    var $file = $(e.currentTarget)[0].files[0];

    uploadFile($file, "profile_image", '/users/'+ id +'/image', function(res) {
      _this.model.set(res);
    })
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

    if ($day === "" || $month === "" || $year === "") {
      return alertify.error('Fecha incorrecta');
    };

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