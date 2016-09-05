'use strict';

var router = require('express').Router(),
  carrinho = require('../controllers/carrinho');

router.get('/', carrinho.lista);
router.get('/:id', carrinho.abre);
router.post('/', carrinho.adiciona);
router.put('/:id', carrinho.atualiza);
router.delete('/:id', carrinho.apaga);

module.exports = router;
