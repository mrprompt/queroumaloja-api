/**
 * Token Module
 *
 * @author Thiago Paes
 * @package token
 * @licence GPL V3
 */
'use strict';

var router = require('express').Router();
var TokenModel = require(__dirname + '/../models/token');
var routes = [
    '/aviso|POST',
    '/aviso|PUT',
    '/aviso|DELETE',
    '/carrinho|GET',
    '/carrinho|PUT',
    '/carrinho|DELETE',
    '/emprego|POST',
    '/emprego|PUT',
    '/emprego|DELETE',
    '/equipe|POST',
    '/equipe|PUT',
    '/equipe|DELETE',
    '/parceiro|POST',
    '/parceiro|PUT',
    '/parceiro|DELETE',
    '/produto|POST',
    '/produto|PUT',
    '/produto|DELETE',
    '/site|GET',
    '/site|POST',
    '/site|PUT',
    '/site|DELETE',
    '/slide|POST',
    '/slide|PUT',
    '/slide|DELETE',
    '/usuario|GET',
    '/usuario|PUT',
    '/usuario|DELETE',
    '/usuario|POST'
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

        TokenModel
            .findOne({
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

                req.params.usuario = data.usuario;

                next();
            });

        return false;
    } else {
        next();
    }
});

module.exports = router;