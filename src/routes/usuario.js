'use strict';

var router      = require('express').Router();
var path        = require('path');
var controller  = require(path.join(__dirname, '/../controllers/usuario'));

router.get('/', controller.lista);
router.get('/:id', controller.abre);
router.post('/', controller.adiciona);
router.put('/:id', controller.atualiza);
router.delete('/:id', controller.apaga);

module.exports = router;
