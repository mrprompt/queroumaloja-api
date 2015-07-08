'use strict';

var pagination = require('mongoose-paginate');
var paginate = require('express-paginate');
var mongoose = require(__dirname + '/index').mongoose;
var Schema = mongoose.Schema;
var ProdutoSchema = new Schema({
    codigo: {
        type: String,
        default: ''
    },
    titulo: {
        type: String
    },
    descricao: {
        type: String
    },
    tipo: {
        type: String,
        default: ''
    },
    valor: {
        type: Number,
        default: 0.00
    },
    categoria: {
        type: String,
        default: ''
    },
    ativo: {
        type: Boolean,
        default: true
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

ProdutoSchema.plugin(pagination);

var Produto = mongoose.model('Produto', ProdutoSchema);

exports.list = function (req, res, callback) {
    var filter = {
        site: req.headers.authentication
    };

    if (req.query.tipo !== undefined) {
        filter.tipo = req.query.tipo;

        if (req.query.categoria !== undefined) {
            filter.categoria = req.query.categoria;
        }
    };

    Produto
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

exports.get = function (req, res, callback) {
    var id = req.params.id;

    Produto
        .findOne({
            _id: id,
            site: req.headers.authentication
        })
        .exec(function (err, data) {
            return callback(err, data);
        });
};

exports.create = function (req, res, callback) {
    var data = req.body;
    var dados = {
        titulo: data.titulo,
        descricao: data.descricao,
        imagem: JSON.parse(data.imagem),
        site: req.headers.authentication,
        codigo: data.codigo,
        tipo: data.tipo,
        categoria: data.categoria,
        valor: data.valor
    };

    var produto = new Produto(dados);
    produto.save(function (err, data) {
        return callback(err, data);
    });
};

exports.update = function (req, res, callback) {
    var id = req.params.id;
    var data = req.body;
    var dados = {
        titulo: data.titulo,
        descricao: data.descricao,
        codigo: data.codigo,
        tipo: data.tipo,
        categoria: data.categoria,
        valor: data.valor
    };

    if (data.imagem) {
        dados.imagem = JSON.parse(data.imagem);
    }

    Produto.update({
        _id: id,
        site: req.headers.authentication
    }, dados, function (err, data) {
        return callback(err, data);
    });
};

exports.remove = function (req, res, callback) {
    var id = req.params.id;

    Produto.remove({
        _id: id,
        site: req.headers.authentication
    }, function (err, data) {
        return callback(err, data);
    });
};