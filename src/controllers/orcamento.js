'use strict';

var paginate            = require('express-paginate');
var OrcamentoModel      = require(__dirname + '/../models/orcamento');
var OrcamentoController = {
    lista: function (req, res) {
        OrcamentoModel.paginate(
            {
                site: req.headers.site
            },
            {
                page: req.query.page,
                limit: req.query.limit,
                populate: ['site'],
                sortBy: {
                    cadastro: -1
                }
            },
            function (err, data, pageCount, itemCount) {
                if (err) {
                    return res.status(500).json({
                        object: 'object',
                        has_more: false,
                        data: err,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                res.status(200).json({
                    object: 'list',
                    has_more: paginate.hasNextPages(req)(pageCount),
                    data: data,
                    itemCount: itemCount,
                    pageCount: pageCount
                });
            }
        );
    },

    abre: function (req, res) {
        OrcamentoModel.findOne({
            _id: req.params.id,
            site: req.headers.site
        })
            .populate(['site'])
            .exec(function (err, data) {
                if (err) {
                    return res.status(500).json({
                        object: 'object',
                        has_more: false,
                        data: err,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                res.status(200).json({
                    object: 'object',
                    has_more: false,
                    data: data,
                    itemCount: 1,
                    pageCount: 1
                });
            });
    },

    adiciona: function (req, res) {
        var orcamento = new OrcamentoModel({
            solicitante: req.body.solicitante,
            empresa: req.body.empresa,
            documento: req.body.documento,
            email: req.body.email,
            telefone: req.body.telefone,
            celular: req.body.celular,
            servico: req.body.servico,
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            cep: req.body.cep,
            cidade: req.body.cidade,
            estado: req.body.estado,
            detalhes: req.body.detalhes,
            cadastro: req.body.cadastro,
            site: req.headers.site
        });

        orcamento.save(function (err, data) {
            if (err) {
                return res.status(500).json({
                    object: 'object',
                    has_more: false,
                    data: err,
                    itemCount: 1,
                    pageCount: 1
                });
            }

            res.status(201).json({
                object: 'object',
                has_more: false,
                data: data,
                itemCount: 1,
                pageCount: 1
            });
        });
    },

    atualiza: function (req, res) {
        OrcamentoModel.update(
            {
                _id: req.params.id,
                site: req.headers.site
            },
            req.body,
            function (err, data) {
                if (err) {
                    return res.status(500).json({
                        object: 'object',
                        has_more: false,
                        data: err,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                res.status(204).json({
                    object: 'object',
                    has_more: false,
                    data: data,
                    itemCount: 1,
                    pageCount: 1
                });
            }
        );
    },

    apaga: function (req, res) {
        OrcamentoModel.remove(
            {
                _id: req.params.id,
                site: req.headers.site
            },
            function (err, data) {
                if (err) {
                    return res.status(500).json({
                        object: 'object',
                        has_more: false,
                        data: err,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                res.status(204).json({
                    object: 'object',
                    has_more: false,
                    data: data,
                    itemCount: 1,
                    pageCount: 1
                });
            }
        );
    }
}

module.exports = OrcamentoController;
