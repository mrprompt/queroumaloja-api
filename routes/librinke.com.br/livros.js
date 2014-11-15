'use strict';

var path = require('path');
var request = require('request');
var fs = require('fs');
var routes = require('../index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var livro = routes.livro.Livro;
    var conteudos = {
        site: req.site
    };

    livro
        .find({
            site: req.site._id
        })
        .exec(function(err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.livros = linhas;

                res.render(dominio + '/livros/index', conteudos);
            }
        });
};

exports.get = function(req, res) {
    var dominio = req.site.dominio;
    var livro = routes.livro.Livro;
    var conteudos = {
        site: req.site
    };

    livro
        .findOne({
            site: req.site._id,
            _id: req.params.id
        })
        .exec(function(err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.livro = linhas;

                res.render(dominio + '/livros/view', conteudos);
            }
        });
};