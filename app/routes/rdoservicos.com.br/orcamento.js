'use strict';

var async = require('async');
var routes = require('../index').routes;
var conteudos = {};
var LIMITE = 4;

exports.index = function (req, res) {
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

                        callback();
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

                        callback();
                    }
                }
            );
        }
    ], function () {
        conteudos.site = req.site;

        console.log(req.site);

        return res.render(req.site.dominio + '/orcamento/index', conteudos);
    });
};
