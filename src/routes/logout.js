'use strict';

var router      = require('express').Router();
var controller  = require(__dirname + '/../controllers/logout');

router.post('/', controller.logout);

module.exports = router;
