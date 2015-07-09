'use strict';

var routes = {
    aviso: require('../models/aviso'),
    cliente: require('../models/cliente'),
    contato: require('../models/contato'),
    curriculo: require('../models/curriculo'),
    emprego: require('../models/emprego'),
    equipe: require('../models/equipe'),
    orcamento: require('../models/orcamento'),
    parceiro: require('../models/parceiro'),
    site: require('../models/site'),
    slide: require('../models/slide'),
    produto: require('../models/produto'),
    carrinho: require('../models/carrinho'),
    usuario: require('../models/usuario'),
};

exports.list = function(req, res) {
    var modulo = req.params.modulo;
    var route = eval('routes.' + modulo);

    if (route == undefined || typeof (route).list != 'function') {
        return res.status(404).send('Módulo não encontrado');
    }
    
    (route).list(req, res, function(err, rows) {
        if (err) {
            return res.status(500).send(err);
        }

        res.json(rows);
    });
};

exports.get = function(req, res) {
    var modulo = req.params.modulo;
    var route = eval('routes.' + modulo);

    if (route == undefined || typeof (route).list != 'function') {
        return res.status(404).send('Módulo não encontrado: ');
    }

    (route).get(req, res, function(err, rows) {
        if (err) {
            return res.status(500).send(err);
        }

        res.json(rows);
    });
};

exports.create = function(req, res) {
    var modulo = req.params.modulo;
    var route = eval('routes.' + modulo);

    if (route == undefined || typeof (route).list != 'function') {
        return res.status(404).send('Módulo não encontrado');
    }

    (route).create(req, res, function(err, rows) {
        if (err) {
            return res.status(500).send(err);
        }

        res.json(rows);
    });
};

exports.update = function(req, res) {
    var modulo = req.params.modulo;
    var route = eval('routes.' + modulo);

    if (route == undefined || typeof (route).list != 'function') {
        return res.status(404).send('Módulo não encontrado');
    }

    (route).update(req, res, function(err, rows) {
        if (err) {
            return res.status(500).send(err);
        }

        res.json(rows);
    });
};

exports.remove = function(req, res) {
    var modulo = req.params.modulo;
    var route = eval('routes.' + modulo);

    if (route == undefined || typeof (route).list != 'function') {
        return res.status(404).send('Módulo não encontrado');
    }

    (route).remove(req, res, function(err, rows) {
        if (err) {
            return res.status(500).send(err);
        }

        res.json(rows);
    });
};

exports.login = function (req, res) {
    var route = require('../models/usuario');

    (route).auth(req, res, function (err, rows) {
        if (err) {
            return res.status(500).send(err);
        }

        res.json(rows);
    });
};