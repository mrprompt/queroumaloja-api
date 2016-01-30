/**
 * Carrinho
 *
 * @author Thiago Paes
 * @package carrinho
 * @licence GPL V3
 */
'use strict';

var router      = require('express').Router();
var connection  = require(__dirname + '/../modules/connection');
var controller  = require(__dirname + '/../controllers/carrinho');
var carrinho    = require(__dirname + '/../events/carrinho');

router.get('/', carrinho, controller.lista);
router.get('/:id', carrinho, controller.abre);
router.post('/', carrinho, controller.adiciona);
router.put('/:id', carrinho, controller.atualiza);
router.delete('/:id', carrinho, controller.apaga);

module.exports = router;