'use strict';

var ProdutoSchema = require('../schemas/produto'),
  ProdutoModel = function () {};

/**
 * Lista os produtos
 */
ProdutoModel.prototype.lista = function (site, filtro = {}, done) {
    var filter = {
        site: site,
        ativo: true
    };

    if (filtro.tipo !== undefined) {
        filter["categoria.uri"] = filtro.tipo.toLowerCase();

        if (filtro.categoria !== undefined) {
            filter["categoria.categoria.uri"] = filtro.categoria.toLowerCase();
        }
    }

    ProdutoSchema.paginate(
        filter, 
        { 
            page: filtro.page, 
            limit: filtro.limit, 
            sort: { 
                cadastro: 'desc' 
            } 
        }, 
        done
    );
};

/**
 * Visualiza um produto
 */
ProdutoModel.prototype.abre = function (id, site, done) {
    ProdutoSchema.findOne({ _id: id, site: site }, done);
};

/**
 * Adiciona um produto
 */
ProdutoModel.prototype.adiciona = function (site, params, done) {
    ProdutoSchema.create(params, done);
};

/**
 * Atualiza os dados de um produto
 */
ProdutoModel.prototype.atualiza = function (id, site, params, done) {
    ProdutoSchema.findOneAndUpdate({ _id: id, site: site }, params, { new: true, multi: true }, done);
};

/**
 * Remove um produto
 */
ProdutoModel.prototype.apaga = function (id, site, done) {
    ProdutoSchema.findOneAndUpdate({ _id: id, site: site }, { ativo: false }, { new: true, multi: true }, done);
};

module.exports = new ProdutoModel;
