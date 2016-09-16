'use strict';

var ProdutoSchema = require('../schemas/produto'),
  BuscaModel = function () {};

/**
 * Buscar por um produto
 */
BuscaModel.prototype.busca = function (site, palavra, page, limit, done) {
    ProdutoSchema.paginate(
        {
            site: site,
            ativo: true,
            $text: {
                $search: palavra
            }
        },
        {
            page    : page,
            limit   : limit,
            sort    : {
                cadastro : 'desc'
            }
        },
        done
    );
};

module.exports = new BuscaModel;
