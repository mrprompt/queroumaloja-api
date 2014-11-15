'use strict';

var path = require('path');
var request = require('request');
var fs = require('fs');
var routes = require('../index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var calcado = routes.calcado.Calcado;
    var conteudos = {
        site: req.site
    };

    calcado
        .find({
            site: req.site._id
        })
        .exec(function(err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.calcados = linhas;

                res.render(dominio + '/calcados/index', conteudos);
            }
        });
};

exports.get = function(req, res) {
    var dominio = req.site.dominio;
    var calcado = routes.calcado.Calcado;
    var conteudos = {
        site: req.site
    };

    calcado
        .findOne({
            site: req.site._id,
            _id: req.params.id
        })
        .exec(function(err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.calcado = linhas;

                res.render(dominio + '/calcados/view', conteudos);
            }
        });
};