'use strict';

var UsuarioDAO = require('../models/usuario'),
  UsuarioController = function () {};

/**
 * Lista os usuários
 *
 * @param req
 * @param res
 * @param done
 */
UsuarioController.prototype.lista = function (site, pagina, limite, done) {
    UsuarioDAO.lista(site, pagina, limite, done);
};

/**
 * Visualiza um usuário
 *
 * @param req
 * @param res
 * @param done
 */
UsuarioController.prototype.abre = function (id, site, done) {
    UsuarioDAO.abre(id, site, done);
};

/**
 * Adiciona um usuário
 *
 * @param req
 * @param res
 * @param done
 */
UsuarioController.prototype.adiciona = function (site, params, done) {
    if (!params.nome) {
        done(new Error('Nome não informado'));
        return;
    }

    if (!params.email) {
        done(new Error('Email não informado'));
        return;
    }

    if (!params.password) {
        done(new Error('Password não informado'));
        return;
    }

    UsuarioDAO.adiciona(site, params, done);
};

/**
 * Atualiza um usuário
 *
 * @param req
 * @param res
 * @param done
 */
UsuarioController.prototype.atualiza = function (id, site, params, done) {
    if (!params.nome) {
        done(new Error('Nome não informado'));
        return;
    }

    UsuarioDAO.atualiza(id, site, params, done);
};

/**
 * Remove um usuário
 *
 * @param req
 * @param res
 * @param done
 */
UsuarioController.prototype.apaga = function (id, site, done) {
    UsuarioDAO.apaga(id, site, done);
};

module.exports = new UsuarioController;
