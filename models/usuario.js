'use strict';

var UsuarioSchema = require('../schemas/usuario'),
  UsuarioModel = function () {};

/**
 * Lista os usuários cadastrados
 */
UsuarioModel.prototype.lista = function (site, page, limit, done) {
    UsuarioSchema.paginate(
        {
            site: site
        },
        {
            page: page,
            limit: limit,
            sort: {
                nome: 'asc',
                cadastro: 'desc'
            }
        },
        done
    );
};

/**
 * Abre um usuário para visualização
 */
UsuarioModel.prototype.abre = function (id, site, done) {
    UsuarioSchema.findOne({ _id: id, site: site }, done);
};

/**
 * Adiciona um usuario
 */
UsuarioModel.prototype.adiciona = function (site, params, done) {
    UsuarioSchema.create(
        {
            site: site,
            nome: params.nome,
            email: params.email,
            password: params.password
        },
        done
    );
};

/**
 * Atualiza os dados de um usuario
 */
UsuarioModel.prototype.atualiza = function (id, site, params, done) {
    UsuarioSchema.update(
        {
            _id: id,
            site: site
        },
        {
            $set: {
                nome: params.nome,
                email: params.email
            }
        },
        done
    );
};

/**
 * Remove um usuário
 */
UsuarioModel.prototype.apaga = function (id, site, done) {
    UsuarioSchema.findOneAndUpdate(
        {
            _id: id,
            site: site
        },
        {
            $set: {
                ativo: false
            }
        },
        done
    );
};

/**
 * Busca um usuário pelo email e senha
 */
UsuarioModel.prototype.login = function (email, senha, site, done) {
    UsuarioSchema.findOne({ email: email, password: senha, site: site }, done);
};

/**
 * Atualiza a senha
 */
UsuarioModel.prototype.atualizaSenha = function (id, site, senha, done) {
    UsuarioSchema.findOneAndUpdate(
        {
            _id: id,
            site: site
        },
        {
            $set: {
                password: senha
            }
        },
        done
    );
};

module.exports = new UsuarioModel;
