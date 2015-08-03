'use strict';
var sendGridConfig = require('../config/sendgrid');

var sendgrid = require('sendgrid')(sendGridConfig.apiKey);
 var email = new sendgrid.Email();
 email.addTo('alejandro@brandspa.com');
 email.setSubject('set this');
 email.setHtml('test');
 email.setFrom('noresponder@bvc.com.co');
 email.addSubstitution('-id-', '1223');
 email.addSubstitution('-salt-', '1j1j1j1j');
 email.addFilter('templates', 'template_id', 'b6c2a5e3-27e4-425f-90c7-5e0e3c397bec');
 sendgrid.send(email, function(err, status){
  if (err) { return console.error(err); }
  console.log(status);
 });
