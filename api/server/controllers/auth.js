(function () {
  'use strict';

  // require the module jsonwebtoken
  var config = require('../config/serverConfig'),
    jsonwebtoken = require('jsonwebtoken'),
    secretKey = config.secretKey;

  module.exports = {

    // function checks for the token
    authenticate: function (req, res, next) {
      var token = req.body.token || req.params.token || req.headers['x-access-token'];
      // check if token exists
      if (token) {
        jsonwebtoken.verify(token, secretKey, function (err, decoded) {
          if (err) {
            res.status(403).send({
              success: false,
              message: "Failed to authenticate user"
            });
          } else {
            req.decoded = decoded;
            next();
          }
        });
      } else {
        res.status(403).send({
          success: false,
          message: "No token provided!"
        });
      }
    }
  };
})();
