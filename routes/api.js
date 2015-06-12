'use strict';

var routes = require('./index').routes;
var fs = require('fs');
var ini = require('ini').parse(fs.readFileSync(__dirname + '/../config/config.ini', 'utf-8'));
var cloudinary = require('cloudinary').v2;

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
        return res.status(404).send('Módulo não encontrado: ', route);
    }

    (route).get(req, res);
};

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
};

exports.delete = function(req, res) {
    var modulo = req.params.modulo;
    var route = eval('routes.' + modulo);

    if (route == undefined) {
        return res.status(404).send('Módulo não encontrado');
    }

    (route).delete(req, res);
};

exports.upload = function (req, res) {
    var file = req.files.file;
    var dominio = req.site.dominio;

    cloudinary.config({
        cloud_name: ini.cloudinary.cloud_name,
        api_key: ini.cloudinary.api_key,
        api_secret: ini.cloudinary.api_secret
    });

    cloudinary.uploader.upload(file.path, {
        tags: dominio
    }, function (err, image) {
        return res.json(image);
    });
};
