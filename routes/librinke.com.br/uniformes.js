'use strict';

var routes = require('../index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var uniforme = routes.produto.Produto;
    var conteudos = {
        site: req.site
    };

    uniforme
        .find({
            site: req.site._id,
            tipo: 'Uniformes'
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
    var uniforme = routes.produto.Produto;
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