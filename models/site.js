'use strict';

var connection = require('./index');
var mongoose = connection.mongoose;
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
    }
});

var Site = mongoose.model('Site', SiteSchema);

exports.Site = Site;

exports.get = function(req, res) {
    Site
        .findOne({
            _id: req.site._id
        })
        .exec(function(err, site) {
            if (err) {
                console.log(err);
            } else {
                res.json(site);
            }
        });
};

exports.update = function(req, res) {
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
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};