'use strict';

var router     = require('express').Router();
var controller = require(__dirname + '/../controllers/index');

router.get('/', controller.lista);

module.exports = router;
