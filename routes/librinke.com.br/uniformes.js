'use strict';

var path = require('path');
var request = require('request');
var fs = require('fs');
var routes = require('../index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var uniforme = routes.uniforme.Uniforme;
    var conteudos = {
        site: req.site
    };

    uniforme
        .find({
            site: req.site._id
        })
        .exec(function(err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.uniformes = linhas;

                res.render(dominio + '/uniformes/index', conteudos);
            }
        });
};

exports.get = function(req, res) {
    var dominio = req.site.dominio;
    var uniforme = routes.uniforme.Uniforme;
    var conteudos = {
        site: req.site
    };

    uniforme
        .findOne({
            site: req.site._id,
            _id: req.params.id
        })
        .exec(function(err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.uniforme = linhas;

                res.render(dominio + '/uniformes/view', conteudos);
            }
        });
};