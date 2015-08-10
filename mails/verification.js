'use strict';
var sendGridConfig = require('../config/sendgrid');
var sendgrid = require('sendgrid')(sendGridConfig.apiKey);

module.exports = function mailVerification(user, next) {
  var email = new sendgrid.Email();
  email.addTo(user.email);
  email.addTo('alejandro@brandspa.com');
  email.setSubject('Instaproud confirmar correo');
  email.setHtml('Por favor confirme su correo haciendo click en el link de abajo');
  email.setFrom('noresponder@bvc.com.co');
  email.addSubstitution('-linkHref-', 'http://instaproud.bvc.com.co/users/' + user.id + '/validation/?code=' + user.id);
  email.addSubstitution('-linkText-', 'Confirmar Tu correo');
  email.addFilter('templates', 'template_id', 'b6c2a5e3-27e4-425f-90c7-5e0e3c397bec');
  sendgrid.send(email, function(err, json){
    if (err) return next(err);
    return next(null, json);
  });
};
