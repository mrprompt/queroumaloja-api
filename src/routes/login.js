'use strict';

var router     = require('express').Router();
var controller = require(__dirname + '/../controllers/login');

router.post('/', controller.adiciona);

module.exports = router;
