/**
 * Index
 *
 * @author Thiago Paes
 * @package index
 * @licence GPL V3
 */
'use strict';

var router     = require('express').Router();
var controller = require(__dirname + '/../controllers/index');

router.get('/', controller.lista);

module.exports = router;
