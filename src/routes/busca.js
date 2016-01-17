/**
 * Busca
 *
 * @author Thiago Paes
 * @package busca
 * @licence GPL V3
 */
'use strict';

var router     = require('express').Router();
var connection = require(__dirname + '/../modules/connection');
var controller = require(__dirname + '/../controllers/busca');

router.get('/', controller.busca);

module.exports = router;