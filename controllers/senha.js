const UsuarioModel = require('../models/usuario');

const SenhaController = function () {};

/**
 * Atualiza a senha do usuário
 */
SenhaController.prototype.atualiza = (id, site, password, done) => {
  if (!password) {
    done(new Error('Nova senha não informada'));
    return;
  }

  UsuarioModel.atualizaSenha(id, site, password, done);
};

module.exports = new SenhaController();
