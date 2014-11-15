'use strict';

var path = require('path');
var request = require('request');
var fs = require('fs');
var routes = require('../index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var servico = routes.servicos.Servico;
    var atuacao = routes.atuacao.Atuacao;
    var parceiro = routes.parceiro.Parceiro;
    var conteudos = {
        site: req.site
    };

    servico
        .find({
            site: req.site._id
        })
        .exec(function(err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.servicos = linhas;

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

                                        res.render(dominio + '/servicos/index', conteudos);
                                    }
                                });
                        }
                    });
            }
        });
};