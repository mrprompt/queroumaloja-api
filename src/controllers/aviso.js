'use strict';

var paginate        = require('express-paginate');
var router          = require('express').Router();
var striptags       = require('striptags');
var AvisoModel      = require('../../src/models/aviso');
var AvisoController = {
    /**
     * Lista os avisos
     *
     * @param req
     * @param res
     * @param done
     */
    lista: function (req, res, done) {
        AvisoModel
            .paginate(
                {
                    site    : req.headers.site,
                    ativo   : true
                },
                {
                    page    : req.query.page,
                    limit   : req.query.limit,
                    sort    : {
                        cadastro : 'desc'
                    }
                },
                function (err, data) {
                    if (err) {
                        res.status(500).json({
                            object      : 'error',
                            has_more    : false,
                            data        : err,
                            itemCount   : 1,
                            pageCount   : 1
                        });
                    } else {
                        var pageCount = data.pages;
                        var itemCount = data.total;

                        res.status(200).json({
                            object      : 'list',
                            has_more    : paginate.hasNextPages(req)(pageCount),
                            data        : data.docs,
                            itemCount   : itemCount,
                            pageCount   : pageCount
                        });
                    }

                    done(err, data);
                }
            );
    },

    /**
     * Visualiza um aviso
     *
     * @param req
     * @param res
     * @param done
     */
    abre: function (req, res, done) {
        AvisoModel
            .findOne({
                _id: req.params.id,
                site: req.headers.site,
                ativo: true
            })
            .exec(function (err, data) {
                if (err) {
                    res.status(404).json({
                        object: 'error',
                        has_more: false,
                        data: err,
                        itemCount: 1,
                        pageCount: 1
                    });

                    done(err);
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

    /**
     * Cadastra um aviso
     *
     * @param req
     * @param res
     * @param done
     */
    adiciona: function (req, res, done) {
        AvisoModel
            .create(
                {
                    titulo   : striptags(req.body.titulo),
                    conteudo : striptags(req.body.conteudo),
                    cadastro : (new Date),
                    tipo     : striptags(req.body.tipo),
                    inicio   : new Date(req.body.inicio),
                    fim      : new Date(req.body.fim),
                    site     : req.headers.site,
                    ativo    : true
                },
                function(err, data) {
                    if (err) {
                        res.status(500).json({
                            object      : 'error',
                            has_more    : false,
                            data        : err,
                            itemCount   : 1,
                            pageCount   : 1
                        });
                    } else {
                        res.status(201).json({
                            object      : 'object',
                            has_more    : false,
                            data        : data,
                            itemCount   : 1,
                            pageCount   : 1
                        });
                    }

                    done(err, data);
                });
    },

    /**
     * Atualiza um aviso
     *
     * @param req
     * @param res
     * @param done
     */
    atualiza: function (req, res, done) {
        AvisoModel
            .update(
                {
                    _id: req.params.id,
                    site: req.headers.site
                },
                {
                    titulo  : striptags(req.body.titulo),
                    conteudo: striptags(req.body.conteudo),
                    tipo    : striptags(req.body.tipo),
                    inicio  : new Date(req.body.inicio),
                    fim     : new Date(req.body.fim),
                    ativo   : true
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
     * Apagar aviso
     *
     * @param req
     * @param res
     * @param done
     */
    apaga: function (req, res, done) {
        AvisoModel
            .remove(
                {
                    _id: req.params.id,
                    site: req.headers.site
                },
                function(err, data) {
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
    }
};

router.get('/', AvisoController.lista);
router.get('/:id', AvisoController.abre);
router.post('/', AvisoController.adiciona);
router.put('/:id', AvisoController.atualiza);
router.delete('/:id', AvisoController.apaga);

module.exports = router;