'use strict';

var pagination  = require('mongoose-paginate');
var mongoose = require(__dirname + '/index').mongoose;
var Schema = mongoose.Schema;
var CurriculoSchema = new Schema({
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
    celular: {
        type: String,
        default: ''
    },
    escala: {
        type: String,
        default: ''
    },
    endereco: {
        type: String,
        default: ''
    },
    bairro: {
        type: String,
        default: ''
    },
    cep: {
        type: String,
        default: ''
    },
    cidade: {
        type: String,
        default: ''
    },
    estado: {
        type: String,
        default: ''
    },
    observacao: {
        type: String,
        default: ''
    },
    arquivo: {
        type: Object
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

CurriculoSchema.plugin(pagination);

var Curriculo = mongoose.model('Curriculo', CurriculoSchema);

exports.list = function(req, res, callback) {
    Curriculo
        .find({
            site: req.headers.authentication
        })
        .sort({
            cadastro: -1
        })
        .exec(function(err, data) {
            callback(err, data);
        });
};

exports.get = function(req, res, callback) {
    var id = req.params.id;

    Curriculo
        .findOne({
            _id: id,
            site: req.headers.authentication
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
        celular: data.celular,
        escala: JSON.stringify(data.escala),
        endereco: data.endereco,
        bairro: data.bairro,
        cep: data.cep,
        cidade: data.cidade,
        estado: data.estado,
        observacao: data.observacao,
        cadastro: data.cadastro,
        arquivo: JSON.parse(data.arquivo),
        site: req.headers.authentication
    };

    var curriculo = new Curriculo(dados);
        curriculo.save(function(err, data) {
            callback(err, data);
        });
};

exports.update = function(req, res, callback) {
    var id = req.params.id;
    var dados = req.body;

    Curriculo.update({
        _id: id,
        site: req.headers.authentication
    }, dados, function(err, data) {
        callback(err, data);
    });
};

exports.delete = function(req, res, callback) {
    var id = req.params.id;

    Curriculo.remove({
        _id: id,
        site: req.headers.authentication
    }, function(err, data) {
        callback(err, data);
    });
};