'use strict';
global.jQuery = require('jquery');
var $ = global.jQuery;
var _ = require('underscore');
var Backbone = require('backbone');
var alertify = require('alertifyjs');
var emailDomain = require('utils/email_domain');
var template = require('templates/profile/register.hbs');
var urls = require('config/urls');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'click .form-register-btn': 'register',
    'keyup .password': 'checkPassword'
  },

  render: function() {
    this.$el.empty().append(template);
    return this;
  },

  checkPassword: function(e) {
    var password = $(e.currentTarget).val();
    var $messageContainer = $('.password-strength');
    var enoughRegex = new RegExp('(?=.{6,}).*', 'g');
    var mediumRegex = new RegExp('^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g');

    if (enoughRegex.test(password) === false) {
      $messageContainer
      .empty()
      .append('<div class="alert alert-warning" role="alert">Contraseña muy debil</div>');
    } else if (mediumRegex.test(password)) {
      $messageContainer
      .empty()
      .append('<div class="alert alert-warning" role="alert">Contraseña fuerte</div>');
    } else {
      $messageContainer
      .empty()
      .append('<div class="alert alert-warning" role="alert">Contraseña mediana</div>');
    }
  },

  register: function(e) {
    e.preventDefault();
    var email = $('.form-register').find('input[name="email"]').val();
    var emailChecked = emailDomain(email, '@bvc.com.co');
    var password = $('.form-register').find('input[name="password"]').val();
    var data = {'email': emailChecked, 'password': password};

    $.ajax({
      url: urls.baseUrl + '/users',
      method: 'POST',
      data: data
    }).then(function(res){
      localStorage.setItem('user', JSON.stringify(res));
      window.location.replace('#profile/' + res.id + '/edit');
    })
    .fail(function(res) {
      _.each(res.responseJSON, function(err){
        alertify.error(err.message);
      });

    });
  }
});
