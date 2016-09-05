'use strict';

var connection      = require('./modules/connection');
var LocalWorker     = require('./workers/carrinho');

LocalWorker.start();
