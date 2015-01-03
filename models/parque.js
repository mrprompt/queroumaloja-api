'use strict';

var connection = require('./index');
var site = require('./site');
var random = require('mongoose-simple-random');
var mongoose = connection.mongoose;
var Schema = mongoose.Schema;
var ParqueSchema = new Schema({
    titulo: {
        type: String
    },
    descricao: {
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
});

ParqueSchema.plugin(random);

var Parque = mongoose.model('Parque', ParqueSchema);

exports.Parque = Parque;

exports.list = function(req, res) {
    Parque
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

    Parque
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
        titulo: data.titulo,
        descricao: data.descricao,
        cadastro: data.cadastro,
        imagem: JSON.parse(data.imagem),
        site: req.site._id,
    };

    var parque = new Parque(dados);
    parque.save(function(err, data) {
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
        titulo: data.titulo,
        descricao: data.descricao,
    };

    if (data.imagem) {
        dados.imagem = JSON.parse(data.imagem);
    }

    Parque.update({
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

    Parque.remove({
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