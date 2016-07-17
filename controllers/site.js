'use strict';

var router          = require('express').Router();
var paginate        = require('express-paginate');
var striptags       = require('striptags');
var SiteModel       = require('../models/site');
var SiteController  = {
    /**
     * Lista os sites cadastrados
     *
     * @param req
     * @param res
     * @param done
     */
    lista: function (req, res, done) {
        SiteModel
            .paginate(
                {},
                {
                    page: req.query.page,
                    limit: req.query.limit,
                    sort: {cadastro : 'desc'}
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
     * Visualiza um site
     *
     * @param req
     * @param res
     * @param done
     */
    abre: function (req, res, done) {
        SiteModel
            .findOne({
                _id: req.params.id
            })
            .exec(function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err.message,
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

    /**
     * Adiciona um site
     *
     * @param req
     * @param res
     * @param done
     */
    adiciona: function (req, res, done) {
        SiteModel
            .create(
                {
                    nome        : striptags(req.body.nome),
                    dominio     : req.body.dominio,
                    emails      : req.body.emails,
                    enderecos   : req.body.enderecos,
                    telefones   : req.body.telefones,
                    categorias  : req.body.categorias,
                    config      : req.body.config
                },
                function (err, newSite) {
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
                            data: newSite,
                            itemCount: 1,
                            pageCount: 1
                        });
                    }

                    done(err, newSite);
                }
            );
    },

    /**
     * Atualiza os dados de um site
     *
     * @param req
     * @param res
     * @param done
     */
    atualiza: function (req, res, done) {
        SiteModel
            .update(
                {
                    _id: req.params.id
                },
                {
                    nome        : striptags(req.body.nome),
                    dominio     : req.body.dominio,
                    emails      : req.body.emails,
                    enderecos   : req.body.enderecos,
                    telefones   : req.body.telefones,
                    categorias  : req.body.categorias,
                    config      : req.body.config
                }, function (err, data) {
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
     * Remove os dados de um site
     *
     * @param req
     * @param res
     * @param done
     */
    apaga: function (req, res, done) {
        SiteModel
            .remove(
                {
                    _id: req.params.id
                },
                function (err, result) {
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
                            data: result,
                            itemCount: 1,
                            pageCount: 1
                        });
                    }

                    done(err, result);
                }
            );
    }
};

router.get('/', SiteController.lista);
router.get('/:id', SiteController.abre);
router.post('/', SiteController.adiciona);
router.put('/:id', SiteController.atualiza);
router.delete('/:id', SiteController.apaga);

module.exports = router;