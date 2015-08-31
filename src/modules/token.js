'use strict';

var router              = require('express').Router();
var firewall            = require(__dirname + '/../modules/firewall');
var token               = require('token');
    token.defaults.secret   = 'AAB';
    token.defaults.timeStep = (24 * 60 * 60) * 30; // 24h in seconds

router.all('*', function(req, res, next) {
    if (_.contains(firewall, req.path + '|' + req.method)) {
        if (!req.headers.authorization) {
            res.status(500).json({
                object: 'object',
                has_more: false,
                data: {
                    message: 'Atributo authorization não encontrado no cabeçalho',
                    status: 500
                },
                itemCount: 0,
                pageCount: 1
            });

            return false;
        }

        var TokenModel = require(__dirname + '/../models/token');

        TokenModel.findOne({
            conteudo: req.headers.authorization
        })
            .exec(function (err, data) {
                if (err || !data) {
                    res.status(403).json({
                        object: 'object',
                        has_more: false,
                        data: {
                            message: 'Token não autorizado',
                            status: 403
                        },
                        itemCount: 0,
                        pageCount: 1
                    });

                    return false;
                }

                var verify = token.verify(data.usuario + '|' + req.headers.site, req.headers.authorization);

                if (verify === 0) {
                    res.status(403).json({
                        object: 'object',
                        has_more: false,
                        data: {
                            message: 'Token inválido',
                            status: 403
                        },
                        itemCount: 0,
                        pageCount: 1
                    });

                    return false;
                }

                next();
            });

        return false;
    } else {
        next();
    }
});

module.exports = router;