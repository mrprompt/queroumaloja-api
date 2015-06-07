'use strict';

var path = require('path');
var request = require('request');
var fs = require('fs');
var routes = require('../index').routes;

exports.index = function (req, res) {
    var dominio = req.site.dominio;
    var livro = routes.livro.Livro;
    var conteudos = {
        site: req.site
    };

    livro
        .find({
            site: req.site._id
        })
        .exec(function (err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.livros = linhas;

                res.render(dominio + '/contato/index', conteudos);
            }
        });
};
