'use strict';

var paginate        = require('express-paginate');
var SiteModel       = require(__dirname + '/../models/site');
var SiteController  = {
    lista: function (req, res, done) {
        SiteModel.paginate(
            {},
            {
                page: req.query.page,
                limit: req.query.limit,
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
        SiteModel.findOne({
            _id: req.params.id
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
        var site = new SiteModel({
            nome: req.body.nome,
            dominio: req.body.dominio,
            descricao: req.body.descricao,
            emails: req.body.emails,
            enderecos: req.body.enderecos,
            telefones: req.body.telefones,
            modulos: [],
            atuacao: req.body.atuacao,
            servicos: req.body.servicos
        });

        site.save(function (err, newSite) {
            if (err) {
                res.status(500).json({
                    object: 'error',
                    has_more: false,
                    data: err,
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
        });
    },

    atualiza: function (req, res, done) {
        SiteModel.update(
            {
                _id: req.params.id,
            },
            {
                nome: req.body.nome,
                dominio: req.body.dominio,
                descricao: req.body.descricao,
                emails: req.body.emails,
                enderecos: req.body.enderecos,
                telefones: req.body.telefones,
            }, function (err, data) {
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
        SiteModel.remove(
            {
                _id: req.params.id
            },
            function (err, result) {
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

module.exports = SiteController;
