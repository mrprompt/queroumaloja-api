'use strict';

var async = require('async');
var routes = require('../index').routes;
var conteudos = {};

exports.index = function (req, res) {
    conteudos.site = req.site;

    async.parallel([
        function (callback) {
            routes.uniforme.Uniforme.find({
                site: req.site._id
            })
                .sort({
                    cadastro: -1
                })
                .exec(function (err, uniformes) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.uniformes = uniformes;

                        callback(null, uniformes);
                    }
                });
        },
        function (callback) {
            routes.parque.Parque.find({
                site: req.site._id
            })
                .sort({
                    cadastro: -1
                })
                .exec(function (err, parques) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.parques = parques;

                        callback(null, parques);
                    }
                });
        },
        function (callback) {
            routes.livro.Livro.find({
                site: req.site._id
            })
                .sort({
                    cadastro: -1
                })
                .exec(function (err, livros) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudos.livros = livros;

                        callback(null, livros);
                    }
                });
        }
    ], function (err, results) {
        if (err) {
            console.log(err);

            return res.send(400);
        }

        if (results == null || results[0] == null) {
            return res.send(400);
        }

        return res.render('librinke.com.br/inicio/index', conteudos)
    });
};