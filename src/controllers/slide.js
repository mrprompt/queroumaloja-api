/**
 * Slides
 *
 * @author Thiago Paes
 * @package slide
 * @licence GPL V3
 */
'use strict';

var paginate        = require('express-paginate');
var striptags       = require('striptags');
var path            = require('path');
var SlideModel      = require(path.join(__dirname, '/../models/slide'));
var SlideController = {
    /**
     * Lista os slides
     *
     * @param req
     * @param res
     * @param done
     */
    lista: function (req, res, done) {
        SlideModel.paginate(
            {
                site: req.headers.site
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
     * Visualiza um slide
     *
     * @param req
     * @param res
     * @param done
     */
    abre: function (req, res, done) {
        SlideModel.findOne({
            _id: req.params.id,
            site: req.headers.site
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
     * Adiciona um slide
     *
     * @param req
     * @param res
     * @param done
     */
    adiciona: function (req, res, done) {
        var slide = new SlideModel({
            titulo      : striptags(req.body.titulo),
            descricao   : striptags(req.body.descricao),
            endereco    : req.body.endereco,
            imagem      : req.body.imagem,
            cadastro    : req.body.cadastro,
            site        : req.headers.site
        });

        slide.save(function (err, data) {
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
        });
    },

    /**
     * Atualiza os dados de um slide
     *
     * @param req
     * @param res
     * @param done
     */
    atualiza: function (req, res, done) {
        var dados = {
            titulo      : striptags(req.body.titulo),
            descricao   : striptags(req.body.descricao),
            endereco    : req.body.endereco,
            imagem      : req.body.imagem
        };

        SlideModel.update(
            {
                _id: req.params.id,
                site: req.headers.site
            },
            dados,
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
     * Remove um slide
     *
     * @param req
     * @param res
     * @param done
     */
    apaga: function (req, res, done) {
        SlideModel.remove(
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
    }
};

module.exports = SlideController;
