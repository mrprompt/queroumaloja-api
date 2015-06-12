'use strict';

var fs = require('fs');
var os = require('os');
var ini = require('ini').parse(fs.readFileSync(__dirname + '/../config/config.ini', 'utf-8'));

exports.index = function(req, res) {
    var dominio = req.site.dominio;
    var modulo = dominio + '/index.js';
    var route = require(__dirname + '/' + modulo);

    return route.index(req, res);
};

exports.list = function(req, res) {
    var dominio = req.site.dominio;
    var modulo = req.params.modulo;
    var modelo = __dirname + '/' + dominio + '/' + modulo + '.js';

    fs.exists(modelo, function(exists) {
        if (exists) {
            var route = require(modelo);

            route.index(req, res);
        } else {
            res.status(404).send('"' + modulo + '" não encontrado.');
        }
    });
};

exports.get = function(req, res) {
    var dominio = req.site.dominio;
    var modulo = req.params.modulo;
    var modelo = __dirname + '/' + dominio + '/' + modulo + '.js';

    fs.exists(modelo, function(exists) {
        if (exists) {
            var route = require(modelo);

            route.get(req, res);
        } else {
            res.status(404).send('"' + modulo + '" não encontrado');
        }
    });
};

exports.panel = function(req, res) {
    var conteudo = {
        site: req.site,
        cpu: {
            hostname: os.hostname(),
            type: os.type(),
            uptime: os.uptime(),
            memory: os.totalmem(),
            free: os.freemem(),
            cpu: os.cpus()
        }
    };

    res.render(ini.global.domain + '/layout', conteudo);
};

exports.template = function(req, res) {
    var diretorio = req.params.diretorio;
    var name = req.params.name;

    return res.render(ini.global.domain + '/' + diretorio + '/' + name);
};

exports.login = function(req, res) {
    res.render(ini.global.domain + '/login/index');
};

exports.logout = function(req, res) {
    req.logout();

    res.render(ini.global.domain + '/login/index');
};