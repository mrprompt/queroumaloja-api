'use strict';

var paginate          = require('express-paginate');
var ClienteModel      = require(__dirname + '/../models/cliente');
var ClienteController = {
    lista: function (req, res) {
        ClienteModel.paginate(
            {
                site: req.headers.site
            },
            {
                page: req.query.page,
                limite: req.query.limit,
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
        var id = req.params.id;

        ClienteModel
            .findOne({
                _id: id,
                site: req.headers.site
            })
            .exec(function (err, result) {
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
                    data: result,
                    itemCount: 1,
                    pageCount: 1
                });
            });
    },

    adiciona: function (req, res) {
        var cliente = new Cliente({
            nome: req.body.nome,
            url: req.body.url,
            logo: req.body.logo,
            atuacao: req.body.atuacao,
            descricao: req.body.descricao,
            cadastro: req.body.cadastro,
            site: req.headers.site
        });

        cliente.save(function (err, result) {
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
                data: result,
                itemCount: 1,
                pageCount: 1
            });
        });
    },

    atualiza: function (req, res) {
        ClienteModel.update(
            {
                _id: req.params.id,
                site: req.headers.site
            },
            req.body,
            function (err, result) {
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
                    data: result,
                    itemCount: 1,
                    pageCount: 1
                });
            }
        );
    },

    apaga: function (req, res) {
        ClienteModel.remove(
            {
                _id: req.params.id,
                site: req.headers.site
            },
            function (err, result) {
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
                    data: result,
                    itemCount: 1,
                    pageCount: 1
                });
            }
        );
    }
}

module.exports = ClienteController;
