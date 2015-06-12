'use strict';

var pagination  = require('mongoose-paginate');
var mongoose = require(__dirname + '/index').mongoose;
var Schema = mongoose.Schema;
var SiteSchema = new Schema({
    nome: {
        type: String
    },
    dominio: {
        type: String
    },
    descricao: {
        type: String
    },
    emails: {
        type: []
    },
    enderecos: {
        type: []
    },
    telefones: {
        type: []
    },
    modulos: {
        type: []
    },
    atuacao: {
        type: []
    },
    servicos: {
        type: []
    }
});

SiteSchema.plugin(pagination);

var Site = mongoose.model('Site', SiteSchema);

exports.Site = Site;

exports.get = function(req, res, callback) {
    Site
        .findOne({
            _id: req.site._id
        })
        .exec(function(err, data) {
            callback(err, data);
        });
};

exports.update = function(req, res, callback) {
    var data = req.body;
    var dados = {
        nome: data.nome,
        dominio: data.dominio,
        descricao: data.descricao,
        emails: data.emails,
        enderecos: data.enderecos,
        telefones: data.telefones,
    };

    Site.update({
        _id: req.site._id,
    }, dados, function(err, data) {
        callback(err, data);
    });
};