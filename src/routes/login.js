/**
 * Login
 *
 * @author Thiago Paes
 * @package login
 * @licence GPL V3
 */
'use strict';

var router     = require('express').Router();
var connection = require(__dirname + '/../modules/connection');
var controller = require(__dirname + '/../controllers/login');

router.post('/', controller.adiciona);

module.exports = router;
