"use strict";
module.exports = function checkAuth(req, res, next) {
   if (req.user) {
    return next();
  };
  return res.redirect("/#login");
};
