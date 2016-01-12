'use strict';

var paginate        = require('express-paginate');
var slugify         = require('slugify');
var ProdutoModel    = require(__dirname + '/../models/produto');
var ProdutoController = {
    lista: function (req, res, done) {
        var filter = {
            site: req.headers.site
        };

        if (req.query.tipo !== undefined) {
            filter["categoria.uri"] = req.query.tipo.toLowerCase()

            if (req.query.categoria !== undefined) {
                filter["categoria.categoria.uri"] = req.query.categoria.toLowerCase();
            }
        }

        ProdutoModel.paginate(
            filter,
            {
                page: req.query.page,
                limit: req.query.limit,
                populate: ['site'],
                sort: {cadastro : 'desc'}
            },
            function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err,
                        itemCount: 1,
                        pageCount: 1
                    });
                } else {
                    var pageCount = data.pages;
                    var itemCount = data.total;

                    res.status(200).json({
                        object: 'list',
                        has_more: paginate.hasNextPages(req)(pageCount),
                        data: data.docs,
                        itemCount: itemCount,
                        pageCount: pageCount
                    });
                }

                done(err, data);
            }
        );
    },

    abre: function (req, res, done) {
        ProdutoModel.findOne({
            _id: req.params.id,
            site: req.headers.site
        })
            .exec(function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err,
                        itemCount: 1,
                        pageCount: 1
                    });
                } else {
                    res.status(200).json({
                        object: 'object',
                        has_more: false,
                        data: data,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                done(err, data);
            });
    },

    adiciona: function (req, res, done) {
        var produto = new ProdutoModel({
            titulo      : req.body.titulo,
            descricao   : req.body.descricao,
            imagem      : req.body.imagem,
            site        : req.headers.site,
            codigo      : req.body.codigo,
            valor       : req.body.valor,
            categoria   : {
                titulo      : req.body.categoria.titulo,
                uri         : slugify(req.body.categoria.titulo.toLowerCase()),
                categoria   : {
                    titulo  : req.body.categoria.categoria.titulo,
                    uri     : slugify(req.body.categoria.categoria.titulo.toLowerCase())
                }
            }
        });

        produto.save(function (err, data) {
            if (err) {
                res.status(500).json({
                    object: 'object',
                    has_more: false,
                    data: err,
                    itemCount: 1,
                    pageCount: 1
                });
            } else {
                res.status(201).json({
                    object: 'object',
                    has_more: false,
                    data: data,
                    itemCount: 1,
                    pageCount: 1
                });
            }

            done(err, data);
        });
    },

    atualiza: function (req, res, done) {
        ProdutoModel.update(
            {
                _id: req.params.id,
                site: req.headers.site
            },
            {
                titulo      : req.body.titulo,
                descricao   : req.body.descricao,
                codigo      : req.body.codigo,
                valor       : req.body.valor,
                imagem      : req.body.imagem,
                categoria   : {
                    titulo      : req.body.categoria.titulo,
                    uri         : slugify(req.body.categoria.titulo.toLowerCase()),
                    categoria   : {
                        titulo  : req.body.categoria.categoria.titulo,
                        uri     : slugify(req.body.categoria.categoria.titulo.toLowerCase())
                    }
                }
            },
            function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err,
                        itemCount: 1,
                        pageCount: 1
                    });
                } else {
                    res.status(204).json({
                        object: 'object',
                        has_more: false,
                        data: data,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                done(err, data);
            }
        );
    },

    apaga: function (req, res, done) {
        ProdutoModel.remove(
            {
                _id: req.params.id,
                site: req.headers.site
            },
            function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err,
                        itemCount: 1,
                        pageCount: 1
                    });
                } else {
                    res.status(204).json({
                        object: 'object',
                        has_more: false,
                        data: data,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                done(err, data);
            }
        );
    }
};

module.exports = ProdutoController;
