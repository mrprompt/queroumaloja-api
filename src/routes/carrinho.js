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
var pagarme     = require(__dirname + '/../events/pagarme');

router.get('/', carrinho, pagarme, controller.lista);
router.get('/:id', carrinho, pagarme, controller.abre);
router.post('/', carrinho, pagarme, controller.adiciona);
router.put('/:id', carrinho, pagarme, controller.atualiza);
router.delete('/:id', carrinho, pagarme, controller.apaga);

module.exports = router;