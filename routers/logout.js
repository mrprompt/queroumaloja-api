'use strict';

var router = require('express').Router(),
  LogoutController = require('../controllers/logout');

router.delete('/', LogoutController.logout);

module.exports = router;
