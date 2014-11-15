'use strict';

var path = require('path');
var request = require('request');
var fs = require('fs');
var routes = require('../index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var slide = routes.slides.Slide;
    var atuacao = routes.atuacao.Atuacao;
    var parceiro = routes.parceiro.Parceiro;
    var aviso = routes.aviso.Aviso;
    var conteudos = {
        site: req.site
    };

    slide
        .find({
            site: req.site._id
        })
        .exec(function(err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.slides = linhas;

                atuacao
                    .find({
                        site: req.site._id
                    })
                    .exec(function(err, linhas) {
                        if (err) {
                            console.log(err);
                        } else {
                            conteudos.atuacao = linhas;

                            parceiro
                                .find({
                                    site: req.site._id
                                })
                                .exec(function(err, linhas) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        conteudos.parceiros = linhas;

                                        aviso
                                            .findOne({
                                                site: req.site._id,
                                                inicio: {
                                                    $lt: (new Date())
                                                },
                                                fim: {
                                                    $gte: (new Date())
                                                }
                                            })
                                            .exec(function(err, linha) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    conteudos.aviso = linha;

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