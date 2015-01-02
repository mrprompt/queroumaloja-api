'use strict';

var path = require('path');
var request = require('request');
var fs = require('fs');
var routes = require('../index').routes;
var async = require('async');

var buscaUniformes = function(req, res) {
    var uniforme = routes.uniforme.Uniforme;

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
                req.uniformes = uniformes;
            }
        });
};

var buscaParques = function(req, res) {
    var parque = routes.parque.Parque;

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
                next.parques = parques;

                return next;
            }
        });
};

var buscaLivros = function(req, res) {
    var livro = routes.livro.Livro;

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
                next.livros = livros;

                return next;
            }
        });
};

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var conteudos = {
        site: req.site
    };

    buscaUniformes(req, res);

    console.log(req.uniformes);

    res.render(dominio + '/inicio/index', conteudos);
};