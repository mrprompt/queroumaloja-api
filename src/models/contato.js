'use strict';

var pagination  = require('mongoose-paginate');
var mongoose = require(__dirname + '/index').mongoose;
var Schema = mongoose.Schema;
var ContatoSchema = new Schema({
    nome: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    telefone: {
        type: String,
        default: ''
    },
    mensagem: {
        type: String,
        default: ''
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
});

ContatoSchema.plugin(pagination);

var Contato = mongoose.model('Contato', ContatoSchema);

exports.Contato = Contato;

exports.list = function(req, res, callback) {
    Contato
        .find({
            site: req.site._id
        })
        .exec(function(err, data) {
            callback(err, data);
        });
};

exports.get = function(req, res, callback) {
    var id = req.params.id;

    Contato
        .findOne({
            _id: id,
            site: req.site._id
        })
        .exec(function(err, data) {
            callback(err, data);
        });
};

exports.create = function(req, res, callback) {
    var data = req.body;

    var dados = {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        mensagem: data.mensagem,
        cadastro: data.cadastro,
        site: req.site._id
    };

    var contato = new Contato(dados);
    contato.save(function(err, data) {
        callback(err, data);
    });
};

exports.update = function(req, res, callback) {
    var id = req.params.id;
    var dados = req.body;

    Contato.update({
        _id: id,
        site: req.site._id
    }, dados, function(err, data) {
        callback(err, data);
    });
};

exports.delete = function(req, res, callback) {
    var id = req.params.id;

    Contato.remove({
        _id: id,
        site: req.site._id
    }, function(err, data) {
        callback(err, data);
    });
};