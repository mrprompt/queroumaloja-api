const ProdutoModel = require('../models/busca');

const BuscaController = function () {};

/**
 * Buscar por um produto
 */
BuscaController.prototype.busca = (site, palavra = null, done = function () {}) => {
  ProdutoModel.busca(site, palavra, 1, 100, done);
};

module.exports = new BuscaController();
