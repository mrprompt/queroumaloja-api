'use strict';

var ProdutoModel = require('../models/busca'), BuscaController = function () {};

/**
 * Buscar por um produto
 *
 * @param req
 * @param res
 * @param done
 */
BuscaController.prototype.busca = function (site, palavra = null, done = function () {}) {
    ProdutoModel.busca(site, palavra, 1, 100, done);
};

module.exports = new BuscaController;
