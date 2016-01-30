/**
 * Produto
 *
 * @author Thiago Paes
 * @package produto
 * @licence GPL V3
 */
'use strict';

var router      = require('express').Router();
var multer      = require('multer');
var path        = require('path');
var connection  = require(path.join(__dirname, '/../modules/connection'));
var upload      = require(path.join(__dirname, '/../modules/upload'));
var controller  = require(path.join(__dirname, '/../controllers/produto'));

router.get('/', controller.lista);
router.get('/:id', controller.abre);
router.post('/', multer({dest: '/tmp/'}).single('imagem'), upload, controller.adiciona);
router.put('/:id', controller.atualiza);
router.delete('/:id', controller.apaga);

module.exports = router;
