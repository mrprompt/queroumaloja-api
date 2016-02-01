'use strict';

var router      = require('express').Router();
var path        = require('path');
var connection  = require(path.join(__dirname, '/../modules/connection'));
var controller  = require(path.join(__dirname, '/../controllers/site'));

router.get('/', controller.lista);
router.get('/:id', controller.abre);
router.post('/', controller.adiciona);
router.put('/:id', controller.atualiza);
router.delete('/:id', controller.apaga);

module.exports = router;
