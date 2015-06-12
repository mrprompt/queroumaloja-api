'use strict';

var routes = require('../index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var produto = routes.produto.Produto;
    var conteudos = {
        site: req.site
    };

    var filter = {
        site: req.site._id
    };

    if (req.query.tipo !== undefined) {
        filter.tipo = req.query.tipo;

        if (req.query.categoria !== undefined) {
            filter.categoria = req.query.categoria;
        }
    };

    produto
        .find(filter)
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