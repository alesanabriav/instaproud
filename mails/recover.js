'use strict';
var sendGridConfig = require('../config/sendgrid');
var sendgrid = require('sendgrid')(sendGridConfig.apiKey);

module.exports = function mailRecover(user, next) {
  var email = new sendgrid.Email();
  email.addTo('alejandro@brandspa.com');
  email.setSubject('Instaproud restablecer contraseña');
  email.setHtml('Por favor haga click en el link de abajo para restablecer su contraseña');
  email.setFrom('noresponder@bvc.com.co');
  email.addSubstitution('-id-', user.id);
  email.addSubstitution('-salt-', user.salt);
  email.addFilter('templates', 'template_id', 'cf08d496-f606-4d95-b6d8-23757441c8f2');
  sendgrid.send(email, function(err, json){
    if (err) return next(err);
    return next(null, json);
  });
};
