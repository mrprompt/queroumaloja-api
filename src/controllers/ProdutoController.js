'use strict';

var paginate        = require('express-paginate');
var ProdutoModel    = require(__dirname + '/../models/produto');
var ProdutoController = {
    lista: function (req, res, done) {
        var filter = {
            site: req.headers.site
        };

        if (req.query.tipo !== undefined) {
            filter.tipo = req.query.tipo;

            if (req.query.categoria !== undefined) {
                filter.categoria = req.query.categoria;
            }
        }

        ProdutoModel.paginate(
            filter,
            {
                page: req.query.page,
                limit: req.query.limit,
                populate: ['site'],
                sortBy: {cadastro: -1}
            },
            function (err, data, pageCount, itemCount) {
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
                        object: 'list',
                        has_more: paginate.hasNextPages(req)(pageCount),
                        data: data,
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
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            imagem: req.body.imagem,
            site: req.headers.site,
            codigo: req.body.codigo,
            tipo: req.body.tipo,
            categoria: req.body.categoria,
            valor: req.body.valor
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
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                codigo: req.body.codigo,
                tipo: req.body.tipo,
                categoria: req.body.categoria,
                valor: req.body.valor,
                imagem: req.body.imagem
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
}

module.exports = ProdutoController;
