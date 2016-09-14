'use strict';

var ProdutoDAO = require('../dao/busca'), BuscaController = function () {};

/**
 * Buscar por um produto
 *
 * @param req
 * @param res
 * @param done
 */
BuscaController.prototype.busca = function (site, palavra = null, done = function () {}) {
    ProdutoDAO.busca(site, palavra, 1, 100, done);
};

module.exports = new BuscaController;
