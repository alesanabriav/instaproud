'use strict';
var sendGridConfig = require('../config/sendgrid');
var sendgrid = require('sendgrid')(sendGridConfig.apiKey);

module.exports = function mailRecover(user, next) {
  var email = new sendgrid.Email();
  email.addTo('alejandro@brandspa.com');
  email.setSubject('Instaproud cambiar contraseña');
  email.setHtml('Por favor haga click en el link de abajo para cambiar su contraseña');
  email.setFrom('noresponder@bvc.com.co');
  email.addSubstitution('-link-', 'http://instaproud.bvc.com.co/users/' + user.id + '/resetpassword?code=' + user.salt);
  email.addSubstitution('-linkText-', 'Ver foto');
  email.addFilter('templates', 'template_id', 'b6c2a5e3-27e4-425f-90c7-5e0e3c397bec');
  sendgrid.send(email, function(err, json){
    if (err) return next(err);
    return next(null, json);
  });
};
