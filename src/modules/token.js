'use strict';

var path        = require('path');
var _           = require('underscore');
var router      = require('express').Router();
var TokenModel  = require(path.join(__dirname, '/../models/token'));
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
    if (req.method === 'OPTIONS' || !_.contains(routes, req.baseUrl + '|' + req.method)) {
        next();

        return true;
    }

    if (!req.headers.authorization) {
        return res.status(403).json({
            object: 'object',
            has_more: false,
            data: {
                message: 'Atributo authorization não encontrado no cabeçalho',
                status: 403
            },
            itemCount: 0,
            pageCount: 1
        });
    }

    TokenModel
        .findOne({
            conteudo: req.headers.authorization
        })
        .populate(['usuario'])
        .exec(function (err, data) {
            if (err || !data || data.usuario.site.toString() !== req.app.site._id.toString() || data.validade < (new Date())) {
                res.status(401).json({
                    object: 'object',
                    has_more: false,
                    data: {
                        message: 'Token não autorizado',
                        status: 401
                    },
                    itemCount: 0,
                    pageCount: 1
                });

                return false;
            }

            req.app.usuario = data.usuario;

            next();
        });

    return false;
});

module.exports = router;