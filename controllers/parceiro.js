'use strict';

var router              = require('express').Router();
var paginate            = require('express-paginate');
var multer              = require('multer');
var striptags           = require('striptags');
var upload              = require('../providers/upload');
var ParceiroModel       = require('../models/parceiro');
var ParceiroController  = {
    /**
     * Lista os parceiros
     *
     * @param req
     * @param res
     * @param done
     */
    lista: function (req, res, done) {
        ParceiroModel
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
     * Visualiza um parceiro
     *
     * @param req
     * @param res
     * @param done
     */
    abre: function (req, res, done) {
        ParceiroModel
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
     * Adiciona um parceiro
     *
     * @param req
     * @param res
     * @param done
     */
    adiciona: function (req, res, done) {
        ParceiroModel
            .create(
                {
                    nome    : striptags(req.body.nome),
                    atuacao : striptags(req.body.atuacao),
                    imagem  : req.body.imagem,
                    url     : req.body.url,
                    cadastro: req.body.cadastro,
                    site    : req.app.site._id
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
     * Atualiza um parceiro
     *
     * @param req
     * @param res
     * @param done
     */
    atualiza: function (req, res, done) {
        ParceiroModel
            .update(
                {
                    _id: req.params.id,
                    site: req.app.site._id
                },
                {
                    nome    : striptags(req.body.nome),
                    atuacao : striptags(req.body.atuacao),
                    url     : req.body.url,
                    imagem  : req.body.imagem,
                    cadastro: req.body.cadastro,
                    site    : req.app.site._id
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
     * Remove um parceiro
     *
     * @param req
     * @param res
     * @param done
     */
    apaga: function (req, res, done) {
        ParceiroModel
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

router.get('/', ParceiroController.lista);
router.get('/:id', ParceiroController.abre);
router.post('/', multer({dest: '/tmp/'}).single('imagem'), upload, ParceiroController.adiciona);
router.put('/:id', ParceiroController.atualiza);
router.delete('/:id', ParceiroController.apaga);

module.exports = router;