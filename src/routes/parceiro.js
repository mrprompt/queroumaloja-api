/**
 * Parceiro
 *
 * @author Thiago Paes
 * @package parceiro
 * @licence GPL V3
 */
'use strict';

var router      = require('express').Router();
var multer      = require('multer');
var connection  = require(__dirname + '/../modules/connection');
var upload      = require(__dirname + '/../modules/upload');
var controller  = require(__dirname + '/../controllers/parceiro');

router.get('/', controller.lista);
router.get('/:id', controller.abre);
router.post('/', multer({dest: '/tmp/'}).single('imagem'), upload, controller.adiciona);
router.put('/:id', controller.atualiza);
router.delete('/:id', controller.apaga);

module.exports = router;
