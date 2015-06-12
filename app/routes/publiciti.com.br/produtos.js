'use strict';

var routes = require('../index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var produto = routes.produto.Produto;
    var conteudos = {
        site: req.site
    };

    produto
        .find({
            site: req.site._id,
            tipo: req.query.tipo
        })
        .sort({
            cadastro: -1
        })
        .exec(function(err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.produtos = linhas;

                res.render(dominio + '/produtos/index', conteudos);
            }
        });
};

exports.get = function(req, res) {
    var dominio = req.site.dominio;
    var produto = routes.produto.Produto;
    var conteudos = {
        site: req.site
    };

    produto
        .findOne({
            site: req.site._id,
            _id: req.params.id
        })
        .exec(function(err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.produto = linhas;

                res.render(dominio + '/produtos/view', conteudos);
            }
        });
};