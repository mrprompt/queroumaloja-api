'use strict';

var UsuarioModel    = require(__dirname + '/../models/usuario');
var LoginController = {
    adiciona: function (req, res) {
        UsuarioModel
            .findOne({
                email: (req.body.email),
                password: (req.body.password)
            })
            .populate('site')
            .exec(function (err, user) {
                if (err || !user || (user.email !== req.body.email || user.password !== req.body.password)) {
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

                    return false;
                }

                res.status(201).json({
                    object: 'object',
                    has_more: false,
                    data: {
                        usuario: user,
                        token: data
                    },
                    itemCount: 1,
                    pageCount: 1
                });
            });
    }
}

module.exports = LoginController;
