global.jQuery = require('jquery');
var $ = global.jQuery;
var _ = require('underscore');
var Backbone = require('backbone');
var alertify = require('alertifyjs');
var emailDomain = require('utils/email_domain');
var template = require('templates/profile/login.hbs');
var urls = require('config/urls');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    "click .form-login-btn": "login"
  },

  render: function() {
    var _this = this;
    _this.$el.empty().append(template);
    return _this;
  },

  login: function(e) {
    e.preventDefault();
    var email = $(".form-login").find("input[name='email']").val();
      var emailChecked = emailDomain(email, "@bvc.com.co");
      var password = $(".form-login").find("input[name='password']").val();
      var data = {'email': emailChecked, 'password': password};

      $.ajax({
        url: urls.baseUrl+"/login",
        method: "POST",
        data: data
      }).then(function(res){
        if (res.message || res.error) {
          alertify.error("email o contraseña incorrecto");
          return;
        };
        localStorage.setItem("user", JSON.stringify(res));
        window.location.replace('#');
      })
  }
});