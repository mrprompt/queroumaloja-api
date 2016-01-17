/**
 * Parceiro
 *
 * @author Thiago Paes
 * @package parceiro
 * @licence GPL V3
 */
'use strict';

var paginate            = require('express-paginate');
var ParceiroModel       = require(__dirname + '/../models/parceiro');
var ParceiroController  = {
    /**
     * Lista os parceiros
     *
     * @param req
     * @param res
     * @param done
     */
    lista: function (req, res, done) {
        ParceiroModel.paginate(
            {
                site: req.headers.site
            },
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

    /**
     * Visualiza um parceiro
     *
     * @param req
     * @param res
     * @param done
     */
    abre: function (req, res, done) {
        ParceiroModel.findOne({
            _id: req.params.id,
            site: req.headers.site
        })
            .populate(['site'])
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

    /**
     * Adiciona um parceiro
     *
     * @param req
     * @param res
     * @param done
     */
    adiciona: function (req, res, done) {
        var parceiro = new ParceiroModel({
            nome: req.body.nome,
            imagem: req.body.imagem,
            url: req.body.url,
            atuacao: req.body.atuacao,
            cadastro: req.body.cadastro,
            site: req.headers.site
        });

        parceiro.save(function (err, data) {
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

    /**
     * Atualiza um parceiro
     *
     * @param req
     * @param res
     * @param done
     */
    atualiza: function (req, res, done) {
        ParceiroModel.update(
            {
                _id: req.params.id,
                site: req.headers.site
            },
            {
                nome: req.body.nome,
                url: req.body.url,
                atuacao: req.body.atuacao,
                image: req.body.imagem,
                cadastro: req.body.cadastro,
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
    },

    /**
     * Remove um parceiro
     *
     * @param req
     * @param res
     * @param done
     */
    apaga: function (req, res, done) {
        ParceiroModel.remove(
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

module.exports = ParceiroController;
