'use strict';

var connection = require('./index');
var site = require('./site');
var random = require('mongoose-simple-random');
var mongoose = connection.mongoose;
var Schema = mongoose.Schema;
var LivroSchema = new Schema({
    titulo: {
        type: String,
        default: ''
    },
    descricao: {
        type: String,
        default: ''
    },
    imagem: {
        type: Object
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    codigo: {
        type: String,
        default: ''
    },
    categoria: {
        type: String,
        default: ''
    },
    editora: {
        type: String,
        default: ''
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
});

LivroSchema.plugin(random);

var Livro = mongoose.model('Livro', LivroSchema);

exports.Livro = Livro;

exports.list = function(req, res) {
    Livro
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

    Livro
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
        codigo: data.codigo,
        editora: data.editora,
        categoria: data.categoria
    };

    var livro = new Livro(dados);
    livro.save(function(err, data) {
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
        codigo: data.codigo,
        editora: data.editora,
        categoria: data.categoria
    };

    if (data.imagem) {
        dados.imagem = JSON.parse(data.imagem);
    }

    Livro.update({
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

    Livro.remove({
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