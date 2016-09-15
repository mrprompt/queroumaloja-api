'use strict';

var ProdutoSchema = require('../schemas/produto'),
  BuscaDAO = function () {};

/**
 * Buscar por um produto
 */
BuscaDAO.prototype.busca = function (site, palavra, page, limit, done) {
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

module.exports = new BuscaDAO;
