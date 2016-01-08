'use strict';

var UsuarioModel    = require(__dirname + '/../models/usuario');
var TokenController = require(__dirname + '/token');
var LoginController = {
    adiciona: function (req, res, done) {
        UsuarioModel
            .findOne({
                email: (req.body.email),
                password: (req.body.password)
            })
            .populate('site')
            .exec(function (err, user) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err,
                        itemCount: 1,
                        pageCount: 1
                    });
                } else if (!user) {
                    res.status(403).json({
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
                    req.user = user;

                    TokenController.adiciona(req, res);
                }

                done(err, user);
            });
    }
}

module.exports = LoginController;
