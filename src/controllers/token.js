'use strict';

var TokenModel      = require(__dirname + '/../models/token');
var TokenController = {
    adiciona: function (req, res, done) {
        var user                    = req.user;
        var token                   = require('token');
            token.defaults.secret   = 'AAB';
            token.defaults.timeStep = (24 * 60 * 60);

        var usertoken = new TokenModel({
            usuario : user._id,
            tipo    : 'rw',
            cadastro: (new Date()),
            conteudo: token.generate(user._id + '|' + user.email)
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
                return res.json({
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
};

module.exports = TokenController;
