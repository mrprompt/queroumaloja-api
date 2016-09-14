'use strict';

var ProdutoDAO = require('../dao/produto'), ProdutoController = function () {};

/**
 * Lista os produtos
 */
ProdutoController.prototype.lista = function (site, params, done) {
    ProdutoDAO.lista(site, params, done);
};

/**
 * Visualiza um produto
 */
ProdutoController.prototype.abre = function (id, site, done) {
    ProdutoDAO.abre(id, site, done);
};

/**
 * Adiciona um produto
 */
ProdutoController.prototype.adiciona = function (site, params, done) {
    if (!params.titulo) {
        done(new Error('Título não informado'));

        return;
    }

    ProdutoDAO.adiciona(site, params, done);
};

/**
 * Atualiza os dados de um produto
 */
ProdutoController.prototype.atualiza = function (id, site, params, done) {
    if (!params.titulo) {
        done(new Error('Título não informado'));

        return;
    }

    ProdutoDAO.atualiza(id, site, params, done);
};

/**
 * Remove um produto
 */
ProdutoController.prototype.apaga = function (id, site, done) {
    ProdutoDAO.apaga(id, site, done);
};

module.exports = new ProdutoController;
