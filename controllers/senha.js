'use strict';

var UsuarioModel = require('../models/usuario'), SenhaController = function () {};

/**
 * Atualiza a senha do usuário
 *
 * @param req
 * @param res
 * @param done
 */
SenhaController.prototype.atualiza = function (id, site, password, done) {
    if (!password) {
        done(new Error('Nova senha não informada'));
        return;
    }

    UsuarioModel.atualizaSenha(id, site, password, done);
};

module.exports = new SenhaController;
