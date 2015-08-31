'use strict';

var router              = require('express').Router();
var token               = require('token');
    token.defaults.secret   = 'AAB';
    token.defaults.timeStep = (24 * 60 * 60) * 30; // 24h in seconds

router.all('*', function(req, res, next) {
    var TokenModel = require(__dirname + '/../models/token');

    TokenModel.findOne({
        conteudo: req.headers.authorization
    })
    .exec(function(err, data) {
        if (err || !data) {
            res.status(403).json({
                object      : 'object',
                has_more    : false,
                data        : {
                    message : 'Token não autorizado',
                    status  : 403
                },
                itemCount   : 0,
                pageCount   : 1
            });

            return false;
        };

        var verify = token.verify(data.usuario + '|' + data.usuario.site, req.headers.authorization);

        if (verify === 0) {
            res.status(403).json({
                object      : 'object',
                has_more    : false,
                data        : {
                    message : 'Token inválido',
                    status  : 403
                },
                itemCount   : 0,
                pageCount   : 1
            });

            return false;
        }

        next();
    });
});

module.exports = router;