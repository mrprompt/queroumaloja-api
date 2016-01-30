/**
 * Busca
 *
 * @author Thiago Paes
 * @package busca
 * @licence GPL V3
 */
'use strict';

var router     = require('express').Router();
var path       = require('path');
var connection = require(path.join(__dirname, '/../modules/connection'));
var controller = require(path.join(__dirname, '/../controllers/busca'));

router.get('/', controller.busca);

module.exports = router;