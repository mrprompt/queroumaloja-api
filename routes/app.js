'use strict';

var fs      = require('fs');
var routes  = require('./index').routes;

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var modulo = dominio + '/index.js';

    fs.exists(__dirname + '/' + modulo, function(existe) {
        if (existe) {
            var route = require(__dirname + '/' + modulo);

            return route.index(req, res);
        } else {
            var conteudos = {
                site: req.site
            };

            return res.render(dominio + '/inicio/index', conteudos);
        }
    });
};

exports.list = function(req, res) {
    var host = req.headers.host;
    var dominio = req.site.dominio;
    var modulo = req.params.modulo;
    var modelo = dominio + '/' + modulo + '.js';
    var conteudos = {
        site: req.site
    }

    if (modulo == 'undefined' || modulo == undefined) {
        return res.status(100);
    }

    fs.exists(__dirname + '/' + modelo, function(existe) {
        if (existe) {
            var route = require(__dirname + '/' + modelo);

            route.index(req, res);
        }
    });
};

exports.get = function(req, res) {
    var host = req.headers.host;
    var dominio = req.site.dominio;
    var modulo = req.params.modulo;
    var modelo = dominio + '/' + modulo + '.js';
    var id = req.params.id;
    var api = 'http://' + host + '/api/' + modulo + '/' + id;
    var conteudos = {
        site: req.site
    }

    if (modulo == 'undefined' || modulo == undefined) {
        return res.status(100);
    }

    if (id == 'undefined' || id == undefined) {
        return res.status(100);
    }

    fs.exists(__dirname + '/' + modelo, function(existe) {
        if (existe) {
            var route = require(__dirname + '/' + modelo);

            route.get(req, res);
        }
    });
};