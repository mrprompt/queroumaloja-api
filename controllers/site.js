'use strict';

var SiteModel = require('../models/site'), SiteController  = function() {};

/**
 * Lista os sites cadastrados
 */
SiteController.prototype.lista = function (page, limit, done) {
    SiteModel.lista(page, limit, done);
};

/**
 * Visualiza um site
 */
SiteController.prototype.abre = function (id, done) {
    SiteModel.abre(id, done);
};

/**
 * Adiciona um site
 */
SiteController.prototype.adiciona = function (params, done) {
    SiteModel.adiciona(params, done);
};

/**
 * Atualiza os dados de um site
 */
SiteController.prototype.atualiza = function (id, params, done) {
    SiteModel.atualiza(id, params, done);
};

/**
 * Remove os dados de um site
 */
SiteController.prototype.apaga = function (id, done) {
    SiteModel.apaga(id, done);
};

module.exports = new SiteController;
