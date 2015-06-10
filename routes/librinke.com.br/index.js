'use strict';

var async = require('async');
var routes = require('../index').routes;
var conteudos = {};
var LIMITE = 4;

exports.index = function (req, res) {
    conteudos.site = req.site;

    async.parallel([
        function (callback) {
            routes.produto.Produto.findRandom(
                {
                    site: req.site._id,
                    tipo: 'Uniformes'
                },
                {},
                {
                    limit: LIMITE
                },
                function (err, uniformes) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.uniformes = uniformes;

                        callback(null, uniformes);
                    }
                }
            );
        },
        function (callback) {
            routes.produto.Produto.findRandom(
                {
                    site: req.site._id,
                    tipo: 'Parques'
                },
                {},
                {
                    limit: LIMITE
                },
                function (err, parques) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.parques = parques;

                        callback(null, parques);
                    }
                }
            );
        },
        function (callback) {
            routes.produto.Produto.find(
                {
                    site: req.site._id,
                    tipo: 'Livros'
                },
                {},
                {
                    limit: LIMITE
                },
                function (err, livros) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.livros = livros;

                        callback(null, livros);
                    }
                }
            );
        }
    ], function (err, results) {
        if (err) {
            console.log(err);

            return res.send(400);
        }

        if (results == null || results[0] == null) {
            return res.send(400);
        }

        return res.render(req.site.dominio + '/inicio/index', conteudos)
    });
};