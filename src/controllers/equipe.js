'use strict';

var paginate            = require('express-paginate');
var EquipeModel         = require(__dirname + '/../models/equipe');
var EquipeController    = {
    lista: function (req, res) {
        EquipeModel.paginate(
            {
                site: req.headers.site
            },
            {
                page: req.query.page,
                limit: req.query.limit,
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
        EquipeModel.findOne({
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
        var membro = new EquipeModel({
            nome: req.body.nome,
            cargo: req.body.cargo,
            email: req.body.email,
            imagem: req.body.imagem,
            site: req.headers.site
        });

        membro.save(function (err, data) {
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
        EquipeModel.update(
            {
                _id: req.params.id,
                site: req.headers.site
            },
            {
                nome: req.body.nome,
                cargo: req.body.cargo,
                email: req.body.email,
                imagem: (req.body.imagem ? JSON.parse(req.body.imagem) : null),
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
    },

    apaga: function (req, res) {
        EquipeModel.remove(
            {
                _id: req.params.id,
                site: req.headers.site
            }, function (err, data) {
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

module.exports = EquipeController;
