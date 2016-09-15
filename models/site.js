'use strict';

var SiteSchema = require('../schemas/site'),
  SiteDAO  = function() {};

/**
 * Lista os sites cadastrados
 */
SiteDAO.prototype.lista = function (page, limit, done) {
    SiteSchema.paginate(
        {},
        {
            page: page,
            limit: limit,
            sort: {
                cadastro : 'desc'
            }
        },
        done
    );
};

/**
 * Visualiza um site
 */
SiteDAO.prototype.abre = function (id, done) {
    SiteSchema.findOne({ _id: id }, done);
};

/**
 * Adiciona um site
 */
SiteDAO.prototype.adiciona = function (params, done) {
    SiteSchema.create(params, done);
};

/**
 * Atualiza os dados de um site
 */
SiteDAO.prototype.atualiza = function (id, params, done) {
    SiteSchema.findOneAndUpdate({ _id: id }, params, { new: true, multi: true }, done);
};

/**
 * Remove os dados de um site
 */
SiteDAO.prototype.apaga = function (id, done) {
    SiteSchema.findOneAndUpdate({ _id: id }, { ativo: false }, { new: true, multi: true }, done);
};

/**
 * Busca pelo dominio
 */
SiteDAO.prototype.buscaPorDominio = function (dominio, done) {
    var hostname = dominio
        .replace(/(http.?:\/\/|(www|local|api))\./im, '')
        .replace(/:[0-9]+/m, '');

    return SiteSchema.findOne({ dominio: hostname }, done);
};

module.exports = new SiteDAO;
