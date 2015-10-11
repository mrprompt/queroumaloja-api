'use strict';

var router     = require('express').Router();
var connection = require(__dirname + '/../modules/connection');
var controller = require(__dirname + '/../controllers/LoginController');

router.post('/', controller.adiciona);

module.exports = router;
