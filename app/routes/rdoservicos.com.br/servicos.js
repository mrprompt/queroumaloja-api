'use strict';

var async = require('async');
var routes = require('../index').routes;
var conteudos = {};
var LIMITE = 4;

exports.index = function (req, res) {
    conteudos.site = req.site;

    async.parallel([
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
                    conteudos.parceiros = parceiros;

                    callback();
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
                    conteudos.empregos = empregos;

                    callback();
                }
            );
        }
    ], function () {
        return res.render(conteudos.site.dominio + '/servicos/index', conteudos);
    });
};
