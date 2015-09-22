'use strict';

var UsuarioModel    = require(__dirname + '/../models/usuario');
var TokenController = require(__dirname + '/token');
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

                req.user = user;

                return TokenController.adiciona(req, res);
            });
    }
}

module.exports = LoginController;
