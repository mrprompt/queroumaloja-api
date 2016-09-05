'use strict';

var UsuarioModel    = require('../models/usuario');
var uniqid          = require('uniqid');
var SenhaController = function () {};

/**
 * Atualiza a senha do usuário
 *
 * @param req
 * @param res
 * @param done
 */
SenhaController.prototype.atualiza = function (req, res, done) {
    UsuarioModel
        .findOneAndUpdate(
            {
                _id: req.app.usuario._id,
                site: req.app.site._id
            },
            {
                $set: {
                    password: req.body.password
                }
            },
            {
                new: true
            },
            function (err, user) {
                if (err) {
                    console.log(err, user);

                    return res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: 'Não foi possível atualizar a senha',
                        itemCount: 0,
                        pageCount: 0
                    });
                } else {
                    var data = {
                        object: 'object',
                        has_more: false,
                        data: user,
                        itemCount: 1,
                        pageCount: 1
                    };
                    
                    res.status(204).json(data);

                    return done(err, data);
                }
            }
        );
};

/**
 * Cria uma nova senha para o usuário
 *
 * @param req
 * @param res
 * @param done
 */
SenhaController.prototype.adiciona = function (req, res, done) {
    var senhaLimpa = uniqid();

    UsuarioModel
        .findOneAndUpdate(
            {
                _id: req.params.usuario,
                site: req.app.site._id
            },
            {
                $set: {
                    password: senhaLimpa
                }
            },
            {
                new: true
            },
            function (err, user) {
                if (err || !user) {
                    return res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: 'Não foi possível atualizar a senha',
                        itemCount: 0,
                        pageCount: 0
                    });
                } else {
                    res.status(201).json({
                        object: 'object',
                        has_more: false,
                        data: senhaLimpa,
                        itemCount: 1,
                        pageCount: 1
                    });

                    return done(err, user);
                }
            }
        );
};

module.exports = new SenhaController;
