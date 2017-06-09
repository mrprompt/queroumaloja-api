const SiteModel = require('../models/site');

const SiteController = function() {};

/**
 * Lista os sites cadastrados
 */
SiteController.prototype.lista = (page, limit, done) => {
  SiteModel.lista(page, limit, done);
};

/**
 * Visualiza um site
 */
SiteController.prototype.abre = (id, done) => {
  SiteModel.abre(id, done);
};

/**
 * Adiciona um site
 */
SiteController.prototype.adiciona = (params, done) => {
  SiteModel.adiciona(params, done);
};

/**
 * Atualiza os dados de um site
 */
SiteController.prototype.atualiza = (id, params, done) => {
  SiteModel.atualiza(id, params, done);
};

/**
 * Remove os dados de um site
 */
SiteController.prototype.apaga = (id, done) => {
  SiteModel.apaga(id, done);
};

module.exports = new SiteController();
