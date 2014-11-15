'use strict';

var connection = require('./index');
var site = require('./site');
var mongoose = connection.mongoose;
var Schema = mongoose.Schema;
var TenisSchema = new Schema({
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
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
}, {
    collection: 'tenis'
});

var Tenis = mongoose.model('Tenis', TenisSchema);

exports.Tenis = Tenis;

exports.list = function(req, res) {
    Tenis
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

    Tenis
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
        site: req.site._id
    };

    var tenis = new Tenis(dados);
    tenis.save(function(err, data) {
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
        descricao: data.descricao
    };

    if (data.imagem) {
        dados.imagem = JSON.parse(data.imagem)
    }

    Tenis.update({
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

    Tenis.remove({
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