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

exports.Cliente = Cliente;

exports.list = function(req, res) {
    Cliente
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

    Cliente
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
        url: data.url,
        logo: data.logo,
        atuacao: data.atuacao,
        descricao: data.descricao,
        cadastro: data.cadastro,
        site: req.site._id
    };

    var cliente = new Cliente(dados);
    cliente.save(function(err, data) {
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

    Cliente.update({
        _id: id,
        site: req.site._id
    }, data, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;

    Cliente.remove({
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
