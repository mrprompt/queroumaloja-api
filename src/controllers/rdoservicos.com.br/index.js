'use strict';

var async = require('async');
var routes = require('../index').routes;
var conteudos = {};
var LIMITE = 4;

exports.index = function (req, res) {
    conteudos.site = req.site;

    async.parallel([
        function (callback) {
            routes.slide.Slide.find(
                {
                    site: req.site._id
                },
                {},
                {
                    limit: LIMITE
                },
                function (err, slides) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.slides = slides;

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
            routes.aviso.Aviso.findOne({
                site: req.site._id,
                inicio: {
                    $lt: (new Date())
                },
                fim: {
                    $gte: (new Date())
                }
            })
                .exec(function (err, aviso) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.aviso = aviso;

                        callback();
                    }
                }
            );
        }
    ], function () {
        return res.render(req.site.dominio + '/inicio/index', conteudos);
    });
};
