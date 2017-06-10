const ProdutoSchema = require('../schemas/produto');

const ProdutoModel = function () {
};

/**
 * Lista os produtos
 */
ProdutoModel.prototype.lista = (site, filtro = {}, done) => {
  const filter = {
    site,
    ativo: true
  };

  if (filtro.tipo !== undefined) {
    filter['categoria.uri'] = filtro.tipo.toLowerCase();

    if (filtro.categoria !== undefined) {
      filter['categoria.categoria.uri'] = filtro.categoria.toLowerCase();
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
ProdutoModel.prototype.abre = (id, site, done) => {
  ProdutoSchema.findOne({ _id: id, site }, done);
};

/**
 * Adiciona um produto
 */
ProdutoModel.prototype.adiciona = (site, params, done) => {
  ProdutoSchema.create(params, done);
};

/**
 * Atualiza os dados de um produto
 */
ProdutoModel.prototype.atualiza = (id, site, params, done) => {
  ProdutoSchema.findOneAndUpdate({ _id: id, site }, params, { new: true, multi: true }, done);
};

/**
 * Remove um produto
 */
ProdutoModel.prototype.apaga = (id, site, done) => {
  ProdutoSchema.findOneAndUpdate({ _id: id, site }, { ativo: false }, { new: true, multi: true }, done);
};

module.exports = new ProdutoModel();
