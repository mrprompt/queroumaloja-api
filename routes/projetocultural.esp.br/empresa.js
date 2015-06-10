'use strict';

var routes = require('../index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var conteudos = {
        site: req.site
    };

    res.render(dominio + '/empresa/index', conteudos);
};