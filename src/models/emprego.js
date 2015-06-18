'use strict';

var pagination  = require('mongoose-paginate');
var mongoose = require(__dirname + '/index').mongoose;
var Schema = mongoose.Schema;
var EmpregoSchema = new Schema({
    titulo: {
        type: String,
        default: ''
    },
    descricao: {
        type: String,
        default: ''
    },
    tags: {
        type: [],
        default: ''
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    salario: {
        type: String,
        default: ''
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
});

EmpregoSchema.plugin(pagination);

var Emprego = mongoose.model('Emprego', EmpregoSchema);

exports.list = function(req, res, callback) {
    Emprego
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

    Emprego
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
        titulo: data.titulo,
        descricao: data.descricao,
        cadastro: (new Date),
        tags: data.tags.split(','),
        salario: data.salario,
        site: req.headers.authentication
    };

    var emprego = new Emprego(dados);
        emprego.save(function(err, data) {
            callback(err, data);
        });
};

exports.update = function(req, res, callback) {
    var id = req.params.id;
    var data = req.body;
    var dados = {
        titulo: data.titulo,
        descricao: data.descricao,
        tags: data.tags.toString().split(','),
        salario: data.salario
    };

    Emprego.update({
        _id: id,
        site: req.headers.authentication
    }, dados, function(err, data) {
        callback(err, data);
    });
};

exports.delete = function(req, res, callback) {
    var id = req.params.id;

    Emprego.remove({
        _id: id,
        site: req.headers.authentication
    }, function(err, data) {
        callback(err, data);
    });
};