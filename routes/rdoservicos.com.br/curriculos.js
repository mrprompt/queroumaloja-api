'use strict';

var async = require('async');
var routes = require('../index').routes;
var conteudos = {};
var LIMITE = 4;

exports.index = function (req, res) {
    conteudos.site = req.site;

    async.parallel([
        function (callback) {
            routes.equipe.Equipe.find(
                {
                    site: req.site._id
                },
                {},
                {
                    limit: LIMITE
                },
                function (err, equipe) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.equipe = equipe;

                        callback(null, equipe);
                    }
                }
            );
        },
        function (callback) {
            routes.atuacao.Atuacao.findRandom(
                {
                    site: req.site._id
                },
                {},
                {},
                function (err, atuacoes) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.atuacao = atuacoes;

                        callback(null, atuacoes);
                    }
                }
            );
        },
        function (callback) {
            routes.parceiro.Parceiro.findRandom(
                {
                    site: req.site._id
                },
                {},
                {
                    limit: LIMITE
                },
                function (err, parceiros) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.parceiros = parceiros;

                        callback(null, parceiros);
                    }
                }
            );
        },
        function (callback) {
            routes.emprego.Emprego.find(
                {
                    site: req.site._id
                }
            )
                .exec(function (err, empregos) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.empregos = empregos;

                        callback(null, empregos);
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

        return res.render(req.site.dominio + '/curriculos/index', conteudos);
    });
};
