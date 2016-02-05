'use strict';

var router      = require('express').Router();
var multer      = require('multer');
var path        = require('path');
var controller  = require(path.join(__dirname, '/../controllers/produto'));
var upload      = require(path.join(__dirname, '/../modules/upload'));
var view        = require(path.join(__dirname, '/../views/json'));

router.get('/', controller.lista);
router.get('/busca/:palavra', controller.busca);
router.get('/:id', controller.abre);
router.post('/', multer({dest: '/tmp/'}).single('imagem'), upload, controller.adiciona);
router.put('/:id', controller.atualiza);
router.delete('/:id', controller.apaga);

module.exports = router;
