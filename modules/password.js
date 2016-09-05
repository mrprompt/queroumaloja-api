'use strict';

var bcrypt = require('bcrypt'),
  salt = process.env.PASSWORD_SALT || '$2a$10$MeVpoT66x6r2eNFZ8diZDe',
  router = require('express').Router();

router.all('*', function(req, res, done) {
  // console.log(req.body);
  if ('password' in req.body === false) {
    return;
  }

  var password = bcrypt.hashSync(req.body.password, salt);

  req.body.password_encrypted = password;

  done();
});

module.exports = router;
