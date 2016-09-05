'use strict';

var router = require('express').Router(),
  usuario = require('../controllers/usuario');

router.get('/', usuario.lista);
router.get('/:id', usuario.abre);
router.post('/', usuario.adiciona);
router.put('/:id', usuario.atualiza);
router.delete('/:id', usuario.apaga);

module.exports = router;
