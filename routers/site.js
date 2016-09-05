'use strict';

var router = require('express').Router(),
  site = require('../controllers/site');

router.get('/', site.lista);
router.get('/:id', site.abre);
router.post('/', site.adiciona);
router.put('/:id', site.atualiza);
router.delete('/:id', site.apaga);

module.exports = router;
