'use strict';
var sendGridConfig = require('../config/sendgrid');

var sendgrid = require('sendgrid')(sendGridConfig.apiKey);

module.exports = function(user, next) {
  var email = new sendgrid.Email();
  email.addTo('alejandro@brandspa.com');
  email.setSubject('Instaproud confirmar correo');
  email.setHtml('test');
  email.setFrom('noresponder@bvc.com.co');
  email.addSubstitution('-id-', user.id);
  email.addSubstitution('-salt-', user.salt);
  email.addFilter('templates', 'template_id', 'b6c2a5e3-27e4-425f-90c7-5e0e3c397bec');
  sendgrid.send(email, function(err, json){
    if (err) return next(err);
    return next(null, json);
  });
};
