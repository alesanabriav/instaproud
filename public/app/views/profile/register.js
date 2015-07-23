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
    'click .form-register-btn': 'getUserData',
    'keyup .password': 'checkPassword'
  },

  /** Attach template to element   */
  render: function() {
    this.$el.empty().append(template);
    return this;
  },

  /**
   * show password strength to user
   * @param  {object} e jquery event
   */
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

  /**
   * get Data from register form
   * @param  {object} e - jquery event
   * @return {function} register - execute register method
   */
  getUserData: function(e) {
    e.preventDefault();
    var email = $('.form-register').find('input[name="email"]').val().toLowerCase();
    var password = $('.form-register').find('input[name="password"]').val().toLowerCase();
    var emailChecked = emailDomain(email, '@bvc.com.co');
    return this.register({'email': emailChecked, 'password': password});
  },

  /**
   * try to register user
   * @param  {object} data - user data
   * @return {Function} ajax
   */
  register: function(data) {
    return $.ajax({
      url: urls.baseUrl + '/users',
      method: 'POST',
      data: data
    })
    .then(function(res){
      var userToStore = {id: res.id, username: res.username, role: res.role, active: res.active};
      localStorage.setItem('user', JSON.stringify(userToStore));
      window.location.replace('#profile/' + res.id + '/edit');
    })
    .fail(function(res) {
      _.each(res.responseJSON, function(err){
        alertify.error(err.message);
      });
    });
  }
});
