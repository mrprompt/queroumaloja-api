'use strict';

var fs = require('fs');
var ini = require('ini').parse(fs.readFileSync(__dirname + '/../../config/config.ini', 'utf-8'));

exports.index = function(req, res) {
    return res.render(ini.global.domain + '/inicio/index');
};

exports.template = function(req, res) {
    var diretorio = req.params.diretorio;
    var name = req.params.name;

    return res.render(ini.global.domain + '/' + diretorio + '/' + name);
};

exports.login = function(req, res) {
    res.render(ini.global.domain + '/login/index', {
        titulo: 'Login'
    });
};
