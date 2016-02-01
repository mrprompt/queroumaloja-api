'use strict';

var router     = require('express').Router();
var path       = require('path');
var connection = require(path.join(__dirname, '/../modules/connection'));
var controller = require(path.join(__dirname, '/../controllers/login'));

router.post('/', controller.adiciona);

module.exports = router;
