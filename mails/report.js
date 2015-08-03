'use strict';
var sendGridConfig = require('../config/sendgrid');
var sendgrid = require('sendgrid')(sendGridConfig.apiKey);

module.exports = function mailReport(photo, next) {
  var email = new sendgrid.Email();
  email.addTo('alejandro@brandspa.com');
  email.setSubject('Instaproud reporte');
  email.setHtml('Una foto fue reportada');
  email.setFrom('noresponder@bvc.com.co');
  email.addSubstitution('-id-', photo.id);
  email.addFilter('templates', 'template_id', 'feb8d6a7-4af0-49a5-a670-fdf87701b269');
  sendgrid.send(email, function(err, json){
    if (err) return next(err);
    return next(null, json);
  });
};
