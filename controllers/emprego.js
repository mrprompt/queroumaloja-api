'use strict';

var router              = require('express').Router();
var paginate            = require('express-paginate');
var striptags           = require('striptags');
var EmpregoModel        = require('../models/emprego');
var EmpregoController   = {
    /**
     * Lista os empregos cadastrados
     *
     * @param req
     * @param res
     * @param done
     */
    lista: function (req, res, done) {
        EmpregoModel
            .paginate(
                {
                    site: req.app.site._id
                },
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
     * Visualiza um emprego
     *
     * @param req
     * @param res
     * @param done
     */
    abre: function (req, res, done) {
        EmpregoModel
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
     * Adiciona um emprego
     *
     * @param req
     * @param res
     * @param done
     */
    adiciona: function (req, res, done) {
        EmpregoModel
            .create(
                {
                    titulo      : striptags(req.body.titulo),
                    descricao   : striptags(req.body.descricao),
                    cadastro    : (new Date()),
                    tags        : striptags(req.body.tags ? req.body.tags.split(',') : ''),
                    salario     : req.body.salario,
                    site        : req.app.site._id
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
    },

    /**
     * Atualiza um emprego
     *
     * @param req
     * @param res
     * @param done
     */
    atualiza: function (req, res, done) {
        EmpregoModel
            .update(
                {
                    _id: req.params.id,
                    site: req.app.site._id
                },
                {
                    titulo      : striptags(req.body.titulo),
                    descricao   : striptags(req.body.descricao),
                    tags        : striptags(req.body.tags ? req.body.tags.toString().split(',') : ''),
                    salario     : req.body.salario
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
     * Remove um emprego
     *
     * @param req
     * @param res
     * @param done
     */
    apaga: function (req, res, done) {
        EmpregoModel
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
    }
};

router.get('/', EmpregoController.lista);
router.get('/:id', EmpregoController.abre);
router.post('/', EmpregoController.adiciona);
router.put('/:id', EmpregoController.atualiza);
router.delete('/:id', EmpregoController.apaga);

module.exports = router;