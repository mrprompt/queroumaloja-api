'use strict';

var routes = require('./index').routes;

exports.list = function(req, res) {
    var modulo = req.params.modulo;
    var route = eval('routes.' + modulo);

    if (route == undefined) {
        return res.status(404).send('Módulo não encontrado');
    }

    (route).list(req, res);
};

exports.get = function(req, res) {
    var modulo = req.params.modulo;
    var route = eval('routes.' + modulo);

    if (route == undefined) {
        return res.status(404).send('Módulo não encontrado');
    }

    (route).get(req, res);
}

exports.create = function(req, res) {
    var modulo = req.params.modulo;
    var route = eval('routes.' + modulo);

    if (route == undefined) {
        return res.status(404).send('Módulo não encontrado');
    }

    (route).create(req, res);
};

exports.update = function(req, res) {
    var modulo = req.params.modulo;
    var route = eval('routes.' + modulo);

    if (route == undefined) {
        return res.status(404).send('Módulo não encontrado');
    }

    (route).update(req, res);
}

exports.delete = function(req, res) {
    var modulo = req.params.modulo;
    var route = eval('routes.' + modulo);

    if (route == undefined) {
        return res.status(404).send('Módulo não encontrado');
    }

    (route).delete(req, res);
}