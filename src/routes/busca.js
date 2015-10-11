'use strict';

var router     = require('express').Router();
var connection = require(__dirname + '/../modules/connection');
var controller = require(__dirname + '/../controllers/BuscaController');

router.get('/', controller.busca);

module.exports = router;