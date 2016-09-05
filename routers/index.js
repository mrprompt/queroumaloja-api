'use strict';

var router = require('express').Router(),
  index = require('../controllers/index');

router.get('/', index.lista);

module.exports = router;
