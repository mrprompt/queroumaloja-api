'use strict';

var ProdutoModel = require('../models/produto'), ProdutoController = function () {};

/**
 * Lista os produtos
 */
ProdutoController.prototype.lista = function (site, params, done) {
    ProdutoModel.lista(site, params, done);
};

/**
 * Visualiza um produto
 */
ProdutoController.prototype.abre = function (id, site, done) {
    ProdutoModel.abre(id, site, done);
};

/**
 * Adiciona um produto
 */
ProdutoController.prototype.adiciona = function (site, params, done) {
    if (!params.titulo) {
        done(new Error('Título não informado'));

        return;
    }

    ProdutoModel.adiciona(site, params, done);
};

/**
 * Atualiza os dados de um produto
 */
ProdutoController.prototype.atualiza = function (id, site, params, done) {
    if (!params.titulo) {
        done(new Error('Título não informado'));

        return;
    }

    ProdutoModel.atualiza(id, site, params, done);
};

/**
 * Remove um produto
 */
ProdutoController.prototype.apaga = function (id, site, done) {
    ProdutoModel.apaga(id, site, done);
};

module.exports = new ProdutoController;
