'use strict';

var routes = require('../index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var livro = routes.produto.Produto;
    var conteudos = {
        site: req.site
    };

    livro
        .find({
            site: req.site._id,
            tipo: 'Livros'
        })
        .exec(function(err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.livros = linhas;

                res.render(dominio + '/produtos/index', conteudos);
            }
        });
};

exports.get = function(req, res) {
    var dominio = req.site.dominio;
    var livro = routes.produto.Produto;
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

                res.render(dominio + '/produtos/view', conteudos);
            }
        });
};