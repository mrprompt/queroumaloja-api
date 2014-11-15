'use strict';

var path = require('path');
var request = require('request');
var fs = require('fs');
var routes = require('../index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var uniforme = routes.uniforme.Uniforme;
    var livro = routes.livro.Livro;
    var parque = routes.parque.Parque;
    var calcado = routes.calcado.Calcado;
    var conteudos = {
        site: req.site
    };

    uniforme
        .find({
            site: req.site._id
        })
        .sort({
            cadastro: -1
        })
        .exec(function(err, uniformes) {
            if (err) {
                console.log(err);
            } else {
                conteudos.uniformes = uniformes;

                parque
                    .find({
                        site: req.site._id
                    })
                    .sort({
                        cadastro: -1
                    })
                    .exec(function(err, parques) {
                        if (err) {
                            console.log(err);
                        } else {
                            conteudos.parques = parques;

                            calcado
                                .find({
                                    site: req.site._id
                                })
                                .sort({
                                    cadastro: -1
                                })
                                .exec(function(err, calcados) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        conteudos.calcados = calcados;

                                        livro
                                            .find({
                                                site: req.site._id
                                            })
                                            .sort({
                                                cadastro: -1
                                            })
                                            .exec(function(err, livros) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    conteudos.livros = livros;

                                                    res.render(dominio + '/inicio/index', conteudos);
                                                }
                                            });
                                    }
                                });
                        }
                    });
            }
        });
};