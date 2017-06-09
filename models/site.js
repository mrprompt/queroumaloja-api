const SiteSchema = require('../schemas/site');

const SiteModel = function () {
};

/**
 * Lista os sites cadastrados
 */
SiteModel.prototype.lista = (page, limit, done) => {
  SiteSchema.paginate(
    {},
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

/**
 * Visualiza um site
 */
SiteModel.prototype.abre = (id, done) => {
  SiteSchema.findOne({ _id: id }, done);
};

/**
 * Adiciona um site
 */
SiteModel.prototype.adiciona = (params, done) => {
  SiteSchema.create(params, done);
};

/**
 * Atualiza os dados de um site
 */
SiteModel.prototype.atualiza = (id, params, done) => {
  SiteSchema.findOneAndUpdate({ _id: id }, params, { new: true, multi: true }, done);
};

/**
 * Remove os dados de um site
 */
SiteModel.prototype.apaga = (id, done) => {
  SiteSchema.findOneAndUpdate({ _id: id }, { ativo: false }, { new: true, multi: true }, done);
};

/**
 * Busca pelo dominio
 */
SiteModel.prototype.buscaPorDominio = (dominio, done) => {
  const hostname = dominio
    .replace(/(http.?:\/\/|(www|local|api))\./im, '')
    .replace(/:[0-9]+/m, '');

  return SiteSchema.findOne({ dominio: hostname }, done);
};

module.exports = new SiteModel();
