const ProdutoSchema = require('../schemas/produto');

const BuscaModel = function () {
};

/**
 * Buscar por um produto
 */
BuscaModel.prototype.busca = (site, palavra, page, limit, done) => {
  ProdutoSchema.paginate(
    {
      site,
      ativo: true,
      $text: {
        $search: palavra
      }
    },
    {
      page,
      limit,
      sort: {
        cadastro: 'desc'
      }
    },
    done
  );
};

module.exports = new BuscaModel();
