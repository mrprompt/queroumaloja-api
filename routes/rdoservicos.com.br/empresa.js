'use strict';

var path = require('path');
var request = require('request');
var fs = require('fs');
var routes = require('../index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var equipe = routes.equipe.Equipe;
    var atuacao = routes.atuacao.Atuacao;
    var emprego = routes.emprego.Emprego;
    var conteudos = {
        site: req.site
    };

    equipe
        .find({
            site: req.site._id
        })
        .exec(function(err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.equipe = linhas;

                atuacao
                    .find({
                        site: req.site._id
                    })
                    .exec(function(err, linhas) {
                        if (err) {
                            console.log(err);
                        } else {
                            conteudos.atuacao = linhas;

                            emprego
                                .find({
                                    site: req.site._id
                                })
                                .exec(function(err, linhas) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        conteudos.empregos = linhas;

                                        res.render(dominio + '/empresa/index', conteudos);
                                    }
                                });
                        }
                    });
            }
        });
};