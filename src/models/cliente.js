'use strict';

var pagination  = require('mongoose-paginate');
var mongoose = require(__dirname + '/index').mongoose;
var Schema = mongoose.Schema;
var ClienteSchema = new Schema({
    nome: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    },
    logo: {
        type: String,
        default: ''
    },
    descricao: {
        type: String,
        default: ''
    },
    atuacao: {
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

ClienteSchema.plugin(pagination);

var Cliente = mongoose.model('Cliente', ClienteSchema);

exports.list = function(req, res, callback) {
    Cliente
        .find({
            site: req.headers.authentication
        })
        .exec(function(err, data) {
            callback(err, data);
        });
};

exports.get = function(req, res, callback) {
    var id = req.params.id;

    Cliente
        .findOne({
            _id: id,
            site: req.headers.authentication
        })
        .exec(function(err, products) {
            callback(err, data);
        });
};

exports.create = function(req, res, callback) {
    var data = req.body;
    var dados = {
        nome: data.nome,
        url: data.url,
        logo: data.logo,
        atuacao: data.atuacao,
        descricao: data.descricao,
        cadastro: data.cadastro,
        site: req.headers.authentication
    };

    var cliente = new Cliente(dados);
        cliente.save(function(err, data) {
            callback(err, data);
        });
};

exports.update = function(req, res, callback) {
    var id = req.params.id;
    var data = req.body;

    Cliente.update({
        _id: id,
        site: req.headers.authentication
    }, data, function(err, data) {
        callback(err, data);
    });
};

exports.delete = function(req, res, callback) {
    var id = req.params.id;

    Cliente.remove({
        _id: id,
        site: req.headers.authentication
    }, function(err, data) {
        callback(err, data);
    });
};
