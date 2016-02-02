'use strict';

var router     = require('express').Router();
var path       = require('path');
var controller = require(path.join(__dirname, '/../controllers/busca'));

router.get('/', controller.busca);

module.exports = router;