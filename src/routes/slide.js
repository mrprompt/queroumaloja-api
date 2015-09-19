'use strict';

var router      = require('express').Router();
var controller  = require(__dirname + '/../controllers/slide');

router.get('/', controller.lista(req, res));
router.get('/:id', controller.abre(req, res));
router.post('/', controller.adiciona(req, res));
router.put('/:id', controller.atualiza(req, res));
router.delete('/:id', controller.apaga(req, res));

module.exports = router;
