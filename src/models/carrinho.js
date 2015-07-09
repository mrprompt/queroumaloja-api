'use strict';

var pagination = require('mongoose-paginate');
var paginate = require('express-paginate');
var mongoose = require(__dirname + '/index').mongoose;
var Schema = mongoose.Schema;

var CarrinhoSchema = new Schema({
    titulo: {
        type: String
    },
    items: [new Schema({
        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto'
        },
        quantidade: {
            type: Number,
            default: 1
        },
        cadastro: {
            type: Date,
            default: Date.now
        }
    })],
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
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

CarrinhoSchema.plugin(pagination);

var Carrinho = mongoose.model('Carrinho', CarrinhoSchema);

exports.list = function (req, res, callback) {
    var filter = {
        site: req.headers.authorization
    };

    Carrinho
        .paginate(filter, req.query.page, req.query.limit, function (err, pageCount, data, itemCount) {
            return callback(err, {
                object: 'list',
                has_more: paginate.hasNextPages(req)(pageCount),
                data: data,
                itemCount: itemCount,
                pageCount: pageCount
            });
        }, {populate: ['items.produto'], sortBy: {cadastro: -1}});
};

exports.get = function (req, res, callback) {
    var id = req.params.id;

    Carrinho
        .findOne({
            _id: id,
            site: req.headers.authorization
        })
        .populate('items.produto')
        .exec(function (err, data) {
            callback(err, data);
        });
};

exports.create = function (req, res, callback) {
    if (req.session.carrinho !== undefined) {
        return callback();
    }

    var data = {
        titulo: req.body.titulo,
        cadastro: (new Date),
        site: req.headers.authorization
    };

    var carrinho = new Carrinho(data);

    carrinho.items.push({
        produto: req.body.produto,
        quantidade: req.body.quantidade
    });

    carrinho.save(function (err, data) {
        req.session.carrinho = carrinho._id;

        callback(err, data);
    });
};

exports.update = function (req, res, callback) {
    var id = req.session.carrinho;

    if (id === undefined) {
        return this.create(req, res, callback);
    }

    this.get(req, res, function (err, object) {
        object.items.push({
            produto: req.body.produto,
            quantidade: req.body.quantidade
        });

        object.save(function (err, data) {
            callback(err, data);
        });
    });
};

exports.remove = function (req, res, callback) {
    var id = req.params.id;

    Carrinho.remove({
        _id: id,
        site: req.headers.authorization
    }, function (err, data) {
        callback(err, data);
    });
};