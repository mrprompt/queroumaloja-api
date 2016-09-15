'use strict';

var _           = require('underscore');
var TokenDAO    = require('../dao/token');
var routes      = require('../config/firewall.json');

var router = function(req, res, done) {
    if (req.method === 'OPTIONS' || !_.contains(routes, req.baseUrl + '|' + req.method)) {
        done();

        return true;
    }

    if (!req.headers.authorization) {
        done(new Error('Atributo authorization não encontrado no cabeçalho'));

        return;
    }

    TokenDAO.buscaPorConteudo(req.headers.authorization, req.app.site._id, function (err, data) {
        if (err || !data) {
            done(new Error('Token não autorizado'));

            return;
        }

        req.app.usuario = data.usuario;

        done(err, data);
    });
};

module.exports = router;