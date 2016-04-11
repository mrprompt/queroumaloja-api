'use strict';

var router            = require('express').Router();
var paginate          = require('express-paginate');
var slugify           = require('slugify');
var striptags         = require('striptags');
var multer            = require('multer');
var upload            = require('../../src/providers/upload');
var ProdutoModel      = require('../../src/models/produto');
var ProdutoController = {
    /**
     * Lista os produtos
     *
     * @param req
     * @param res
     * @param done
     */
    lista: function (req, res, done) {
        var filter = {
            site    : req.headers.site,
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
    },

    /**
     * Visualiza um produto
     *
     * @param req
     * @param res
     * @param done
     */
    abre: function (req, res, done) {
        ProdutoModel
            .findOne({
                _id: req.params.id,
                site: req.headers.site
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
    },

    /**
     * Adiciona um produto
     *
     * @param req
     * @param res
     * @param done
     */
    adiciona: function (req, res, done) {
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
                    peso: req.body.peso
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
    },

    /**
     * Atualiza os dados de um produto
     *
     * @param req
     * @param res
     * @param done
     */
    atualiza: function (req, res, done) {
        ProdutoModel
            .findOneAndUpdate(
                {
                    _id: req.params.id,
                    site: req.headers.site
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
    },

    /**
     * Remove um produto
     *
     * @param req
     * @param res
     * @param done
     */
    apaga: function (req, res, done) {
        ProdutoModel
            .remove(
                {
                    _id: req.params.id,
                    site: req.headers.site
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
    },

    /**
     * Buscar por um produto
     *
     * @param req
     * @param res
     * @param done
     */
    busca: function (req, res, done) {
        ProdutoModel
            .paginate(
                {
                    "site"  : req.headers.site,
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
    }
};

router.get('/', ProdutoController.lista);
router.get('/busca/:palavra', ProdutoController.busca);
router.get('/:id', ProdutoController.abre);
router.post('/', multer({dest: '/tmp/'}).single('imagem'), upload, ProdutoController.adiciona);
router.put('/:id', ProdutoController.atualiza);
router.delete('/:id', ProdutoController.apaga);

module.exports = router;