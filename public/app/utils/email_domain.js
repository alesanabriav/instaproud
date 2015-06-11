"use strict";

module.exports = function(email, domain) {

  if (email.indexOf('@') !== -1) {
    var arr = email.split('@');
    return arr[0]+domain;
  }

  if (email === "") {
    return null;
  };

  return email+domain;
}