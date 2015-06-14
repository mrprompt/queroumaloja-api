'use strict';

var async = require('async');
var routes = require('../index').routes;
var conteudos = {};

exports.index = function (req, res) {
    conteudos.site = req.site;

    async.parallel([
        function (callback) {
            routes.carrinho.list(req, res, function (err, carrinhos) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.carrinho = carrinhos;

                        callback(null, carrinhos);
                    }
                }
            );
        },
        function (callback) {
            routes.produtos.list(req, res, function (err, carrinhos) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.novidades = carrinhos.slice(-14, -1);

                        callback(null, carrinhos);
                    }
                }
            );
        }
    ], function (err, results) {
        if (err) {
            console.log(err);

            return res.status(500).send('Ocorreu um erro inesperado.');
        }

        // randomizando o array final
        conteudos.novidades.sort(function () {
            return 0.5 - Math.random()
        });

        return res.render(req.site.dominio + '/contato/index', conteudos)
    });
};
