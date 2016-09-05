'use strict';

var UsuarioModel    = require('../models/usuario');
var TokenModel      = require('../models/token');
var TokenAdapter    = require('token');
var LoginController = function() {};

/**
 * Efetua um login e adquire um token de acesso
 *
 * @param req
 * @param res
 * @param done
 */
LoginController.prototype.adiciona = function (req, res, done) {
    var filter = {
        email   : req.body.email,
        password: req.body.password,
        site    : req.app.site._id
    };

    TokenAdapter.defaults.secret   = 'AAB';
    TokenAdapter.defaults.timeStep = (24 * 60 * 60);

    UsuarioModel
        .findOne(filter)
        .populate('site')
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    object: 'error',
                    has_more: false,
                    data: err.message,
                    itemCount: 1,
                    pageCount: 1
                });
            } else if (!user) {
                return res.status(403).json({
                    object: 'object',
                    has_more: false,
                    data: {
                        message: 'Usuário/Senha inválidos',
                        code: 403
                    },
                    itemCount: 0,
                    pageCount: 1
                });
            } else {
                // validade do token é de uma semana
                var validade = new Date();
                    validade.setDate(validade.getDate() + 7);

                TokenModel.create(
                    {
                        usuario : user._id,
                        cadastro: (new Date()),
                        validade: validade,
                        conteudo: TokenAdapter.generate(user._id + '|' + user.email)
                    },
                    function (err, data) {
                        delete data.usuario;

                        if (err) {
                            res.status(500).json({
                                object: 'error',
                                has_more: false,
                                data: err.message,
                                itemCount: 1,
                                pageCount: 1
                            });
                        } else {
                            res.status(201).json({
                                object: 'object',
                                has_more: false,
                                data: {
                                    usuario : user,
                                    token   : data,
                                    site    : req.app.site
                                },
                                itemCount: 1,
                                pageCount: 1
                            });
                        }

                        return done(err, data);
                    }
                );
            }
        });
};

module.exports = new LoginController;
