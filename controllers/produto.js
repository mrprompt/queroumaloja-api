'use strict';

var paginate = require('express-paginate'),
  slugify = require('slugify'),
  striptags = require('striptags'),
  ProdutoModel = require('../models/produto'),
  ProdutoController = function () {};

/**
 * Lista os produtos
 *
 * @param req
 * @param res
 * @param done
 */
ProdutoController.prototype.lista = function (req, res, done) {
    var filter = {
        site    : req.app.site._id,
        ativo   : true
    };

    if (req.query.tipo !== undefined) {
        filter["categoria.uri"] = req.query.tipo.toLowerCase();

        if (req.query.categoria !== undefined) {
            filter["categoria.categoria.uri"] = req.query.categoria.toLowerCase();
        }
    }

    ProdutoModel
        .paginate(
            filter,
            {
                page    : req.query.page,
                limit   : req.query.limit,
                sort    : {
                    cadastro : 'desc'
                }
            },
            function (err, data) {
                var status = 500;

                if (err) {
                    var status = 500;
                    var data   = {
                        object      : 'error',
                        has_more    : false,
                        data        : err.message,
                        itemCount   : 1,
                        pageCount   : 1
                    };
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
};

/**
 * Visualiza um produto
 *
 * @param req
 * @param res
 * @param done
 */
ProdutoController.prototype.abre = function (req, res, done) {
    ProdutoModel
        .findOne({
            _id: req.params.id,
            site: req.app.site._id
        })
        .exec(function (err, data) {
            if (err) {
                res.status(500).json({
                    object: 'error',
                    has_more: false,
                    data: err.message,
                    itemCount: 0,
                    pageCount: 0
                });
            } else {
                if (data === null) {
                    res.status(404).json({
                        object: 'error',
                        has_more: false,
                        data: 'Produto não encontrado',
                        itemCount: 0,
                        pageCount: 0
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
            }

            done(err, data);
        });
};

/**
 * Adiciona um produto
 *
 * @param req
 * @param res
 * @param done
 */
ProdutoController.prototype.adiciona = function (req, res, done) {
    ProdutoModel
        .create(
            {
                titulo      : striptags(req.body.titulo),
                descricao   : striptags(req.body.descricao),
                codigo      : striptags(req.body.codigo),
                valor       : req.body.valor,
                imagem      : req.body.imagem,
                categoria   : {
                    titulo      : striptags(req.body.categoria.titulo),
                    uri         : slugify(striptags(req.body.categoria.titulo.toLowerCase())),
                    categoria   : {
                        titulo  : striptags(req.body.categoria.categoria.titulo),
                        uri     : slugify(striptags(req.body.categoria.categoria.titulo.toLowerCase()))
                    }
                },
                estoque: striptags(req.body.estoque),
                dimensoes: req.body.dimensoes,
                peso: req.body.peso,
                site: req.app.site._id
            },
            function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'object',
                        has_more: false,
                        data: err.message,
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
            }
        );
};

/**
 * Atualiza os dados de um produto
 *
 * @param req
 * @param res
 * @param done
 */
ProdutoController.prototype.atualiza = function (req, res, done) {
    ProdutoModel
        .findOneAndUpdate(
            {
                _id: req.params.id,
                site: req.app.site._id
            },
            {
                titulo      : striptags(req.body.titulo),
                descricao   : striptags(req.body.descricao),
                codigo      : striptags(req.body.codigo),
                valor       : req.body.valor,
                imagem      : req.body.imagem,
                categoria   : {
                    titulo      : striptags(req.body.categoria.titulo),
                    uri         : slugify(striptags(req.body.categoria.titulo.toLowerCase())),
                    categoria   : {
                        titulo  : striptags(req.body.categoria.categoria.titulo),
                        uri     : slugify(striptags(req.body.categoria.categoria.titulo.toLowerCase()))
                    }
                },
                estoque: striptags(req.body.estoque),
                dimensoes: req.body.dimensoes,
                peso: req.body.peso
            },
            {
                new: true,
                multi: true
            },
            function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err.message,
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
};

/**
 * Remove um produto
 *
 * @param req
 * @param res
 * @param done
 */
ProdutoController.prototype.apaga = function (req, res, done) {
    ProdutoModel
        .remove(
            {
                _id: req.params.id,
                site: req.app.site._id
            },
            function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err.message,
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
};

/**
 * Buscar por um produto
 *
 * @param req
 * @param res
 * @param done
 */
ProdutoController.prototype.busca = function (req, res, done) {
    ProdutoModel
        .paginate(
            {
                "site"  : req.app.site._id,
                "ativo" : true,
                "$text" : {
                    "$search": (req.params.palavra ? req.params.palavra.toLocaleString() : '')
                }
            },
            {
                page    : req.query.page,
                limit   : req.query.limit,
                sort    : {
                    cadastro : 'desc'
                }
            },
            function(err, data) {
                if (err) {
                    res.status(500).json({
                        object      : 'error',
                        has_more    : false,
                        data        : err,
                        itemCount   : 0,
                        pageCount   : 0
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
};

/**
 * Insere uma imagem no álbum do produto
 *
 * @param req
 * @param res
 * @param done
 */
ProdutoController.prototype.adicionaImagem = function (req, res, done) {
    ProdutoModel
        .findOneAndUpdate(
            {
                _id: req.params.id,
                site: req.app.site._id
            },
            {
                $push: {
                    album: req.body.imagem
                }
            },
            {
                new: true,
                multi: true,
                safe: true,
                upsert: true
            },
            function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err.message,
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
            }
        );
};

/**
 * Remove uma imagem do álbum do produto
 *
 * @param req
 * @param res
 * @param done
 */
ProdutoController.prototype.apagaImagem = function (req, res, done) {
    ProdutoModel
        .findOneAndUpdate(
            {
                _id: req.params.id,
                site: req.app.site._id
            },
            {
                $pull: {
                    album: {
                        _id: req.params.img
                    }
                }
            },
            {
                new: true,
                multi: true
            },
            function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err.message,
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
};

module.exports = new ProdutoController;
