'use strict';
var sendGridConfig = require('../config/sendgrid');
var sendgrid = require('sendgrid')(sendGridConfig.apiKey);

module.exports = function mailVerification(user, next) {
  var email = new sendgrid.Email();
  email.addTo(user.email);
  email.setSubject('Instaproud confirmar correo');
  email.setHtml('<p>Tu cuenta en Instaproud BVC ha sido activada, ya puedes participar por un viaje a San Andrés para dos personas si eres la persona que más fotos comparte hasta el 25 de septiembre.</p> <p>También puedes ganar una tarde libre con almuerzo en "El Tambor" para el área que primero registre a todos sus colaboradores.</p> <P>Si tienes alguna duda durante el desarrollo de esta actividad puedes escribir a <a href="mailto:sconlabvc@bvc.com.co">sconlabvc@bvc.com.co</a></p>');
  email.setFrom('sconlabvc@bvc.com.co');
  email.addSubstitution('-id-', user.id);
  email.addSubstitution('-salt-', user.salt);
  email.addFilter('templates', 'template_id', 'b6c2a5e3-27e4-425f-90c7-5e0e3c397bec');
  sendgrid.send(email, function(err, json){
    if (err) return next(err);
    return next(null, json);
  });
};
