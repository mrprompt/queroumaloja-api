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

                        callback();
                    }
                }
            );
        }
    ], function () {
        return res.render(req.site.dominio + '/oportunidades/index', conteudos);
    });
};

exports.get = function(req, res) {
    var conteudos = {
        site: req.site
    };

    routes.emprego.Emprego.findOne({
            site: req.site._id,
            _id: req.params.id
        })
        .exec(function(err, emprego) {
            if (err) {
                console.log(err);
            } else {
                conteudos.emprego = emprego;

                res.render(req.site.dominio + '/oportunidades/view', conteudos);
            }
        });
};