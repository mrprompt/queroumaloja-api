'use strict';

var path = require('path');
var request = require('request');
var fs = require('fs');
var routes = require('../index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var emprego = routes.emprego.Emprego;
    var parceiro = routes.parceiro.Parceiro;
    var conteudos = {
        site: req.site
    };

    emprego
        .find({
            site: req.site._id
        })
        .exec(function(err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.empregos = linhas;

                parceiro
                    .find({
                        site: req.site._id
                    })
                    .exec(function(err, linhas) {
                        if (err) {
                            console.log(err);
                        } else {
                            conteudos.parceiros = linhas;

                            res.render(dominio + '/oportunidades/index', conteudos);
                        }
                    });
            }
        });
};