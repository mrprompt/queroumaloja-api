'use strict';

var connection = require('./index');
var site = require('./site');
var mongoose = connection.mongoose;
var Schema = mongoose.Schema;
var ParceiroSchema = new Schema({
    nome: {
        type: String
    },
    imagem: {
        type: Object
    },
    url: {
        type: String
    },
    atuacao: {
        type: String
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

var Parceiro = mongoose.model('Parceiro', ParceiroSchema);

exports.Parceiro = Parceiro;

exports.list = function(req, res) {
    Parceiro
        .find({
            site: req.site._id
        })
        .exec(function(err, products) {
            if (err) {
                console.log(err);
            } else {
                res.json(products);
            }
        });
};

exports.get = function(req, res) {
    var id = req.params.id;

    Parceiro
        .findOne({
            _id: id,
            site: req.site._id
        })
        .exec(function(err, products) {
            if (err) {
                console.log(err);
            } else {
                res.json(products);
            }
        });
};

exports.create = function(req, res) {
    var data = req.body;

    var dados = {
        nome: data.nome,
        imagem: JSON.parse(data.imagem),
        url: data.url,
        atuacao: data.atuacao,
        cadastro: data.cadastro,
        site: req.site._id
    };

    var parceiro = new Parceiro(dados);
    parceiro.save(function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    var data = req.body;
    var dados = {
        nome: data.nome,
        url: data.url,
        atuacao: data.atuacao,
        cadastro: data.cadastro,
        site: req.site._id
    };

    if (data.imagem) {
        dados.imagem = JSON.parse(data.imagem);
    }

    Parceiro.update({
        _id: id,
        site: req.site._id
    }, dados, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;

    Parceiro.remove({
        _id: id,
        site: req.site._id
    }, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};