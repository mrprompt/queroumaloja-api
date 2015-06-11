'use strict';

var routes = require('../index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var parque = routes.produto.Produto;
    var conteudos = {
        site: req.site
    };

    parque
        .find({
            site: req.site._id,
            tipo: 'Parques'
        })
        .exec(function(err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.parques = linhas;

                res.render(dominio + '/produtos/index', conteudos);
            }
        });
};

exports.get = function(req, res) {
    var dominio = req.site.dominio;
    var parque = routes.produto.Produto;
    var conteudos = {
        site: req.site
    };

    parque
        .findOne({
            site: req.site._id,
            _id: req.params.id
        })
        .exec(function(err, linhas) {
            if (err) {
                console.log(err);
            } else {
                conteudos.parque = linhas;

                res.render(dominio + '/produtos/view', conteudos);
            }
        });
};