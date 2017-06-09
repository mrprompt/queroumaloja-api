const UsuarioModel = require('../models/usuario');

const UsuarioController = function () {};

/**
 * Lista os usuários
 */
UsuarioController.prototype.lista = (site, pagina, limite, done) => {
  UsuarioModel.lista(site, pagina, limite, done);
};

/**
 * Visualiza um usuário
 */
UsuarioController.prototype.abre = (id, site, done) => {
  UsuarioModel.abre(id, site, done);
};

/**
 * Adiciona um usuário
 */
UsuarioController.prototype.adiciona = (site, params, done) => {
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

  UsuarioModel.adiciona(site, params, done);
};

/**
 * Atualiza um usuário
 */
UsuarioController.prototype.atualiza = (id, site, params, done) => {
  if (!params.nome) {
    done(new Error('Nome não informado'));
    return;
  }

  UsuarioModel.atualiza(id, site, params, done);
};

/**
 * Remove um usuário
 */
UsuarioController.prototype.apaga = (id, site, done) => {
  UsuarioModel.apaga(id, site, done);
};

module.exports = new UsuarioController();
