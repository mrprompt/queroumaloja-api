'use strict';

var router     = require('express').Router();
var controller = require(__dirname + '/../controllers/BuscaController');

router.get('/', controller.busca);

module.exports = router;