'use strict';

var router = require('express').Router(),
  login = require('../controllers/login');

router.post('/', login.adiciona);

module.exports = router;
