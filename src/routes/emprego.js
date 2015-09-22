'use strict';

var router      = require('express').Router();
var controller  = require(__dirname + '/../controllers/emprego');

router.get('/', controller.lista);
router.get('/:id', controller.abre);
router.post('/', controller.adiciona);
router.put('/:id', controller.atualiza);
router.delete('/:id', controller.apaga);

module.exports = router;
