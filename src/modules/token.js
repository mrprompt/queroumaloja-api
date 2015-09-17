'use strict';

var router                  = require('express').Router();
var token                   = require('token');
    token.defaults.secret   = 'AAB';
    token.defaults.timeStep = (24 * 60 * 60) * 30; // 24h in seconds
var routes                  = [
    '/aviso|POST',
    '/aviso|PUT',
    '/aviso|DELETE',
    '/carrinho|GET',
    '/carrinho|POST',
    '/carrinho|PUT',
    '/carrinho|DELETE',
    '/cliente|POST',
    '/cliente|PUT',
    '/cliente|DELETE',
    '/curriculo|GET',
    '/curriculo|PUT',
    '/curriculo|DELETE',
    '/emprego|POST',
    '/emprego|PUT',
    '/emprego|DELETE',
    '/equipe|POST',
    '/equipe|PUT',
    '/equipe|DELETE',
    '/orcamento|GET',
    '/orcamento|POST',
    '/orcamento|PUT',
    '/orcamento|DELETE',
    '/parceiro|POST',
    '/parceiro|PUT',
    '/parceiro|DELETE',
    '/produto|POST',
    '/produto|PUT',
    '/produto|DELETE',
    '/site|PUT',
    '/site|DELETE',
    '/slide|POST',
    '/slide|PUT',
    '/slide|DELETE',
    '/usuario|GET',
    '/usuario|PUT',
    '/usuario|DELETE',
];

router.all('*', function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();

        return true;
    }

    if (_.contains(routes, req.baseUrl + '|' + req.method)) {
        if (!req.headers.authorization) {
            return res.status(500).json({
                object: 'object',
                has_more: false,
                data: {
                    message: 'Atributo authorization não encontrado no cabeçalho',
                    status: 500
                },
                itemCount: 0,
                pageCount: 1
            });
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

                //var verify = token.verify(data.usuario + '|' + req.headers.site, req.headers.authorization);
                //
                //if (verify === 0) {
                //    res.status(403).json({
                //        object: 'object',
                //        has_more: false,
                //        data: {
                //            message: 'Token inválido',
                //            status: 403
                //        },
                //        itemCount: 0,
                //        pageCount: 1
                //    });
                //
                //    return false;
                //}

                req.params.usuario = data.usuario;

                next();
            });

        return false;
    } else {
        next();
    }
});

module.exports = router;