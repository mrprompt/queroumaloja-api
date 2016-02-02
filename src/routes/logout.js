'use strict';

var router      = require('express').Router();
var path        = require('path');
var controller  = require(path.join(__dirname, '/../controllers/logout'));

router.post('/', controller.logout);

module.exports = router;
