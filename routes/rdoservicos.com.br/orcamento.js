'use strict';

var path = require('path');
var request = require('request');
var fs = require('fs');
var routes = require('../index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var servico = routes.servicos.Servico;
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

                res.render(dominio + '/orcamento/index', conteudos);
            }
        });
};