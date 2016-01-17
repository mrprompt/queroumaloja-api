/**
 * Autenticação
 *
 * @author Thiago Paes
 * @package login
 * @licence GPL V3
 */
'use strict';

var UsuarioModel    = require(__dirname + '/../models/usuario');
var TokenModel      = require(__dirname + '/../models/token');
var TokenAdapter    = require('token');
var LoginController = {
    /**
     * Efetua um login e aquire um token de acesso
     *
     * @param req
     * @param res
     * @param done
     */
    adiciona: function (req, res, done) {
        UsuarioModel
            .findOne({
                email: (req.body.email),
                password: (req.body.password)
            })
            .populate('site')
            .exec(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err,
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
                    TokenAdapter.defaults.secret   = 'AAB';
                    TokenAdapter.defaults.timeStep = (24 * 60 * 60);

                    var usertoken = new TokenModel({
                        usuario : user._id,
                        tipo    : 'rw',
                        cadastro: (new Date()),
                        conteudo: TokenAdapter.generate(user._id + '|' + user.email)
                    });

                    usertoken.save(function (err, data) {
                        if (err) {
                            return res.status(500).json({
                                object: 'error',
                                has_more: false,
                                data: err,
                                itemCount: 1,
                                pageCount: 1
                            });
                        } else {
                            return res.status(201).json({
                                object: 'object',
                                has_more: false,
                                data: {
                                    usuario: user,
                                    token: data
                                },
                                itemCount: 1,
                                pageCount: 1
                            });
                        }

                        return done(err, data);
                    });
                }

                done(err, user);
            });
    }
};

module.exports = LoginController;
