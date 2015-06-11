global.jQuery = require('jquery');
var $ = global.jQuery;
var _ = require('underscore');
var Backbone = require('backbone');
var alertify = require('alertifyjs');
var emailDomain = require('utils/email_domain');
var template = require('templates/profile/register.hbs');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  events: {
    "click .form-register-btn": "register"
  },

  render: function() {
    var _this = this;
    _this.$el.empty().append(template);
    return _this;
  },

  register: function(e) {
    e.preventDefault();
    var email = $(".form-register").find("input[name='email']").val();
    var emailChecked = emailDomain(email, "@bvc.com.co");
    var password = $(".form-register").find("input[name='password']").val();
    var data = {'email': emailChecked, 'password': password};

    $.ajax({
      url: "/users",
      method: "POST",
      data: data
    }).then(function(res){
      localStorage.setItem("user", JSON.stringify(res));
      window.location.replace('/#profile/'+res.id+'/edit');
    })
    .fail(function(res) {
      _.each(res.responseJSON, function(err, ind){
        alertify.error(err.message);
      })
    });
  }
});