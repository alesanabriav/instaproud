'use strict';

global.jQuery = require('jquery');
var $ = global.jQuery;
var Backbone = require('backbone');
var alertify = require('alertifyjs');
var emailDomain = require('utils/email_domain');
var template = require('templates/profile/login.hbs');
var urls = require('config/urls');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    'click .form-login-btn': 'getUserData'
  },

  /** Attach template to element   */
  render: function() {
    this.$el.empty().append(template);
    return this;
  },

  /**
   * get Data from login form
   * @param  {object} e - jquery event
   * @return {function} login - execute login method
   */
  getUserData: function(e) {
    e.preventDefault();
    var $formLogin = this.$('.form-login');
    var email = $formLogin.find('input[name="email"]').val().toLowerCase();
    var password = $formLogin.find('input[name="password"]').val().toLowerCase();
    var emailChecked = emailDomain(email, '@bvc.com.co');
    return this.login({'email': emailChecked, 'password': password});
  },

  /**
   * try to login user
   * @param  {object} data - user access
   * @return {Function} ajax
   */
  login: function(data) {
    return $.ajax({
      url: urls.baseUrl + '/login',
      method: 'POST',
      data: data
      })
    .then(function(res){
      if (res.message || res.error) {
        alertify.error(res.message);
        return;
      }
      localStorage.setItem('user', JSON.stringify(res));
      window.location.replace('#');
    });
  }
});
