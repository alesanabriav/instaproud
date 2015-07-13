'use strict';

module.exports = function checkAuth(req, res, next) {
   if (req.user) {
    return next();
  }
  return res.status(403).send({message: 'Unauthorized'});
};
