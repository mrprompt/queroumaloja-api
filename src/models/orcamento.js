'use strict';

var pagination = require('mongoose-paginate');
var paginate = require('express-paginate');
var mongoose = require(__dirname + '/index').mongoose;
var Schema = mongoose.Schema;
var OrcamentoSchema = new Schema({
    solicitante: {
        type: String,
        default: ''
    },
    empresa: {
        type: String,
        default: ''
    },
    documento: {
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
    servico: {
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
    detalhes: {
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

OrcamentoSchema.plugin(pagination);

var Orcamento = mongoose.model('Orcamento', OrcamentoSchema);

exports.list = function(req, res, callback) {
    var filter = {
        site: req.headers.authorization
    };

    Orcamento
        .paginate(filter, req.query.page, req.query.limit, function (err, pageCount, data, itemCount) {
            return callback(err, {
                object: 'list',
                has_more: paginate.hasNextPages(req)(pageCount),
                data: data,
                itemCount: itemCount,
                pageCount: pageCount
            });
        }, {sortBy: {cadastro: -1}});
};

exports.get = function(req, res, callback) {
    var id = req.params.id;

    Orcamento
        .findOne({
            _id: id,
            site: req.headers.authorization
        })
        .populate('servico')
        .exec(function(err, data) {
            callback(err, data);
        });
};

exports.create = function(req, res, callback) {
    var data = req.body;

    var dados = {
        solicitante: data.solicitante,
        empresa: data.empresa,
        documento: data.documento,
        email: data.email,
        telefone: data.telefone,
        celular: data.celular,
        servico: data.servico,
        endereco: data.endereco,
        bairro: data.bairro,
        cep: data.cep,
        cidade: data.cidade,
        estado: data.estado,
        detalhes: data.detalhes,
        cadastro: data.cadastro,
        site: req.headers.authorization
    };

    var orcamento = new Orcamento(dados);
        orcamento.save(function(err, data) {
            callback(err, data);
        });
};

exports.update = function(req, res, callback) {
    var id = req.params.id;

    Orcamento.update({
        _id: id,
        site: req.headers.authorization
    }, req.body, function(err, data) {
        callback(err, data);
    });
};

exports.remove = function(req, res, callback) {
    var id = req.params.id;

    Orcamento.remove({
        _id: id,
        site: req.headers.authorization
    }, function(err, data) {
        callback(err, data);
    });
};