'use strict';

var random      = require('mongoose-simple-random');
var pagination  = require('mongoose-paginate');
var mongoose    = require(__dirname + '/index').mongoose;
var Schema      = mongoose.Schema;
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

ProdutoSchema.plugin(random);
ProdutoSchema.plugin(pagination);

var Produto = mongoose.model('Produto', ProdutoSchema);

exports.Produto = Produto;

exports.list = function(req, res, callback) {
    var filter = {
        site: req.site._id
    };

    if (req.query.tipo !== undefined) {
        filter.tipo = req.query.tipo;

        if (req.query.categoria !== undefined) {
            filter.categoria = req.query.categoria;
        }
    };

    Produto
        .find(filter)
        .sort({
            cadastro: -1
        })
        .exec(function(err, data) {
            callback(err, data);
        });
};

exports.get = function(req, res, callback) {
    var id = req.params.id;

    Produto
        .findOne({
            _id: id,
            site: req.site._id
        })
        .exec(function(err, data) {
            callback(err, data);
        });
};

exports.create = function(req, res, callback) {
    var data    = req.body;
    var dados   = {
        titulo: data.titulo,
        descricao: data.descricao,
        imagem: JSON.parse(data.imagem),
        site: req.site._id,
        codigo: data.codigo,
        tipo: data.tipo,
        categoria: data.categoria,
        valor: data.valor
    };

    var produto = new Produto(dados);
        produto.save(function(err, data) {
            callback(err, data);
        });
};

exports.update = function(req, res, callback) {
    var id      = req.params.id;
    var data    = req.body;
    var dados   = {
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
        site: req.site._id
    }, dados, function(err, data) {
        callback(err, data);
    });
};

exports.delete = function(req, res, callback) {
    var id = req.params.id;

    Produto.remove({
        _id: id,
        site: req.site._id
    }, function(err, data) {
        callback(err, data);
    });
};