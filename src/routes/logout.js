/**
 * Logout
 *
 * @author Thiago Paes
 * @package logout
 * @licence GPL V3
 */
'use strict';

var router      = require('express').Router();
var connection  = require(__dirname + '/../modules/connection');
var controller  = require(__dirname + '/../controllers/logout');

router.post('/', controller.logout);

module.exports = router;
