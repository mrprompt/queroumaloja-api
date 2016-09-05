'use strict';

var router = require('express').Router(),
  senha = require('../controllers/senha');

router.post('/:usuario', senha.adiciona);
router.put('/', senha.atualiza);

module.exports = router;
