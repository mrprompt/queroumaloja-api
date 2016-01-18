/**
 * Parceiro
 *
 * @author Thiago Paes
 * @package parceiro
 * @licence GPL V3
 */
'use strict';

var router      = require('express').Router();
var connection  = require(__dirname + '/../modules/connection');
var controller  = require(__dirname + '/../controllers/parceiro');
var multer      = require('multer');
var upload      = require(__dirname + '/../modules/upload');

router.get('/', controller.lista);
router.get('/:id', controller.abre);
router.post('/', multer({dest: '/tmp/'}).single('imagem'), upload, controller.adiciona);
router.put('/:id', controller.atualiza);
router.delete('/:id', controller.apaga);

module.exports = router;
