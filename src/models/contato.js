'use strict';

var pagination  = require('mongoose-paginate');
var paginate = require('express-paginate');
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

exports.list = function(req, res, callback) {
    var filter = {
        site: req.headers.authorization
    };

    Contato
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

    Contato
        .findOne({
            _id: id,
            site: req.headers.authorization
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
        site: req.headers.authorization
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
        site: req.headers.authorization
    }, dados, function(err, data) {
        callback(err, data);
    });
};

exports.remove = function(req, res, callback) {
    var id = req.params.id;

    Contato.remove({
        _id: id,
        site: req.headers.authorization
    }, function(err, data) {
        callback(err, data);
    });
};