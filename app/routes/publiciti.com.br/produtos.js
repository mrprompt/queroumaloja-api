'use strict';

var async = require('async');
var routes = require('../index').routes;
var conteudos = {};
var LIMITE = 24;

exports.index = function (req, res) {
    conteudos.site = req.site;
    conteudos.novidades = [];

    var dominio = req.site.dominio;
    var produto = routes.produto.Produto;

    var filter = {
        site: req.site._id
    };

    if (req.query.tipo !== undefined) {
        filter.tipo = req.query.tipo;

        if (req.query.categoria !== undefined) {
            filter.categoria = req.query.categoria;
        }
    }
    ;

    async.parallel([
        function (callback) {
            routes.produto.Produto.findRandom(
                {
                    site: req.site._id
                },
                {},
                {
                    limit: LIMITE
                },
                function (err, uniformes) {
                    if (err) {
                        console.log(err);
                    } else {
                        uniformes.forEach(function (uniforme) {
                            conteudos.novidades.push(uniforme);
                        });

                        callback(null, uniformes);
                    }
                }
            );
        },
        function (callback) {
            routes.produto.Produto.find(
                filter,
                {},
                {
                    limit: LIMITE
                },
                function (err, parques) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.produtos = parques;

                        callback(null, parques);
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

        if (conteudos.produtos.length === 0 || conteudos.produtos === undefined) {
            conteudos.produtos = conteudos.novidades;
        }

        return res.render(req.site.dominio + '/produtos/index', conteudos)
    });
};

exports.get = function (req, res) {
    conteudos.site = req.site;
    conteudos.novidades = [];

    var dominio = req.site.dominio;
    var produto = routes.produto.Produto;

    var filter = {
        site: req.site._id
    };

    if (req.query.tipo !== undefined) {
        filter.tipo = req.query.tipo;

        if (req.query.categoria !== undefined) {
            filter.categoria = req.query.categoria;
        }
    };

    async.parallel([
        function (callback) {
            routes.produto.Produto.findOne({
                _id: req.params.id
            })
                .exec(function (err, linhas) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.produto = linhas;

                        callback(null, linhas);
                    }
                });
        },
        function (callback) {
            routes.produto.Produto.find(
                filter,
                {},
                {
                    limit: LIMITE
                },
                function (err, parques) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.novidades = parques;

                        callback(null, parques);
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

        return res.render(req.site.dominio + '/produtos/view', conteudos)
    });
};