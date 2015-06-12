'use strict';

var random      = require('mongoose-simple-random');
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

var Produto = mongoose.model('Produto', ProdutoSchema);

exports.Produto = Produto;

exports.list = function(req, res) {
    var filter = {
        site: req.site._id
    };

    if (req.query.tipo) {
        filter.tipo = req.query.tipo;

        if (req.query.categoria) {
            filter.categoria = req.query.categoria;
        }
    };

    Produto
        .find(filter)
        .sort({
            cadastro: -1
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

    Produto
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
        tipo: data.tipo,
        categoria: data.categoria,
        valor: data.valor
    };

    var Produto = new Produto(dados);
        Produto.save(function(err, data) {
            if (err) {
                res.json(err);
            } else {
                res.json(data);
            }
        });
};

exports.update = function(req, res) {
    var id      = req.params.id;
    var data    = req.body;
    var dados   = {
        titulo: data.titulo,
        descricao: data.descricao,
        codigo: data.codigo,
        editora: data.editora,
        categoria: data.categoria
    };

    if (data.imagem) {
        dados.imagem = JSON.parse(data.imagem);
    }

    Produto.update({
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

    Produto.remove({
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