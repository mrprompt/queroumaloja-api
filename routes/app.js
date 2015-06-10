'use strict';

var fs = require('fs');

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var modulo = dominio + '/index.js';
    var route = require(__dirname + '/' + modulo);

    return route.index(req, res);
};

exports.list = function(req, res) {
    var host = req.headers.host;
    var dominio = req.site.dominio;
    var modulo = req.params.modulo;
    var modelo = __dirname + '/' + dominio + '/' + modulo + '.js';
    console.log(modelo);

    fs.exists(modelo, function(exists) {
        if (exists) {
            var route = require(modelo);

            return route.index(req, res);
        }

        res.status(404).send('"' + modulo + '" não encontrado.');
    });
};

exports.get = function(req, res) {
    var host = req.headers.host;
    var dominio = req.site.dominio;
    var modulo = req.params.modulo;
    var modelo = dominio + '/' + modulo + '.js';

    fs.exists(modelo, function(exists) {
        if (exists) {
            var route = require(modelo);

            return route.get(req, res);
        }

        res.status(404).send('"' + modulo + '" não encontrado.');
    });
};