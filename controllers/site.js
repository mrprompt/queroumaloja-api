'use strict';

var SiteDAO = require('../dao/site'), SiteController  = function() {};

/**
 * Lista os sites cadastrados
 *
 * @param req
 * @param res
 * @param done
 */
SiteController.prototype.lista = function (page, limit, done) {
    SiteDAO.lista(page, limit, done);
};

/**
 * Visualiza um site
 *
 * @param req
 * @param res
 * @param done
 */
SiteController.prototype.abre = function (id, done) {
    SiteDAO.abre(id, done);
};

/**
 * Adiciona um site
 *
 * @param req
 * @param res
 * @param done
 */
SiteController.prototype.adiciona = function (params, done) {
    SiteDAO.adiciona(params, done);
};

/**
 * Atualiza os dados de um site
 *
 * @param req
 * @param res
 * @param done
 */
SiteController.prototype.atualiza = function (id, params, done) {
    SiteDAO.atualiza(id, params, done);
};

/**
 * Remove os dados de um site
 *
 * @param req
 * @param res
 * @param done
 */
SiteController.prototype.apaga = function (id, done) {
    SiteDAO.apaga(id, done);
};

module.exports = new SiteController;
