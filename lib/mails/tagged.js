'use strict';
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('2ylANHE6ZPUq4YGcoNNUpw');

module.exports = function (req, next) {
    var message = {
    "html": req.body.message,
    "subject": req.body.subject,
    "from_email": "noreplay@instaproud.bvc.com.co",
    "from_name": "Instaproud",
    "to": "alejandro@brandspa.com",
    "important": true,
    "track_opens": true,
    "track_clicks": true,
    "inline_css": true,
    "url_strip_qs": null,
    "tags": [
      "transactional"
    ]
  };

  mandrill_client.messages.send({"message": message, "async": false}, function(result) {
    return next(result);
  },
  function(e) {
    return next('A mandrill error occurred: ' + e.name + ' - ' + e.message);
  });
};

