'use strict';

var router     = require('express').Router();
var path       = require('path');
var controller = require(path.join(__dirname, '/../controllers/index'));

router.get('/', controller.lista);

module.exports = router;
