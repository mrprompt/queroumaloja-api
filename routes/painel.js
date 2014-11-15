'use strict';

var siteModel = require('../models/site').Site;

exports.index = function(req, res) {
    var dominio = req.headers.host.substr( (req.headers.host.indexOf('.') + 1) ).replace(/.[0-9]{2,4}$/, '');

    siteModel.findOne({
        dominio: dominio
    }, function(err, site) {
        if (err) {
            return res.status(500).send('Ocorreu um erro carregando site');
        }

        if (null == site) {
            return res.status(404).send('Site não encontrado');
        }

        res.render('painel/layout', {
            site: site,
            usuario: req.user
        });
    });
};

exports.template = function(req, res) {
    var dominio = req.headers.host.substr( (req.headers.host.indexOf('.') + 1) ).replace(/.[0-9]{2,4}$/, '');
    var modulo = req.params.modulo;
    var diretorio = req.params.diretorio;
    var name = req.params.name;

    res.render('painel/' + diretorio + '/' + name);
};

exports.login = function(req, res) {
    res.render('painel/login/index', {
        titulo: 'Login'
    });
};
