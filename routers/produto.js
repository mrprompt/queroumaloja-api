'use strict';

var router = require('express').Router(),
  multer = require('multer'),
  upload = require('../modules/upload'),
  ProdutoController = require('../controllers/produto');

router.get('/', ProdutoController.lista);
router.get('/busca/:palavra', ProdutoController.busca);
router.get('/:id', ProdutoController.abre);
router.post('/', multer({dest: '/tmp/'}).single('imagem'), upload, ProdutoController.adiciona);
router.put('/:id', ProdutoController.atualiza);
router.delete('/:id', ProdutoController.apaga);
router.post('/:id/album', multer({dest: '/tmp/'}).single('imagem'), upload, ProdutoController.adicionaImagem);
router.delete('/:id/album/:img', ProdutoController.apagaImagem);

module.exports = router;
