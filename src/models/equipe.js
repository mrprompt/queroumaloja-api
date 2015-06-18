'use strict';

var pagination  = require('mongoose-paginate');
var mongoose = require(__dirname + '/index').mongoose;
var Schema = mongoose.Schema;
var EquipeSchema = new Schema({
    nome: {
        type: String
    },
    cargo: {
        type: String
    },
    email: {
        type: String
    },
    imagem: {
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
}, {
    collection: 'equipe'
});

EquipeSchema.plugin(pagination);

var Equipe = mongoose.model('Equipe', EquipeSchema);

exports.Equipe = Equipe;

exports.list = function(req, res, callback) {
    Equipe
        .find({
            site: req.headers.authentication
        })
        .exec(function(err, data) {
            callback(err, data);
        });
};

exports.get = function(req, res, callback) {
    var id = req.params.id;

    Equipe
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
        cargo: data.cargo,
        email: data.email,
        imagem: data.imagem,
        site: req.headers.authentication
    };

    var membro = new Equipe(dados);
        membro.save(function(err, data) {
            callback(err, data);
        });
};

exports.update = function(req, res, callback) {
    var id = req.params.id;

    var data = req.body;

    var dados = {
        nome: data.nome,
        cargo: data.cargo,
        email: data.email,
        site: req.headers.authentication
    };

    if (data.imagem) {
        dados.imagem = JSON.parse(data.imagem);
    }

    Equipe.update({
        _id: id
    }, dados, function(err, data) {
        callback(err, data);
    });
};

exports.delete = function(req, res, callback) {
    var id = req.params.id;

    Equipe.remove({
        _id: id,
        site: req.headers.authentication
    }, function(err, data) {
        callback(err, data);
    });
};