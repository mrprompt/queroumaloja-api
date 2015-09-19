'use strict';

var router     = require('express').Router();
var controller = require(__dirname + '/../controllers/produto');

router.get('/', controller.lista(req, res));

module.exports = router;