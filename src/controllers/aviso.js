'use strict';

var paginate        = require('express-paginate');
var AvisoModel      = require(__dirname + '/../models/aviso');
var AvisoController = {
    lista: function (req, res) {
        AvisoModel.paginate(
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
                        object      : 'object',
                        has_more    : false,
                        data        : err,
                        itemCount   : 1,
                        pageCount   : 1
                    });
                }

                return res.status(200).json({
                    object      : 'list',
                    has_more    : paginate.hasNextPages(req)(pageCount),
                    data        : data,
                    itemCount   : itemCount,
                    pageCount   : pageCount
                });
            }
        );
    },

    abre: function (req, res) {
        AvisoModel
            .findOne({
                _id: req.params.id,
                site: req.headers.site
            })
            .exec(function(err, data) {
                if (err) {
                    return res.status(500).json({
                        object      : 'object',
                        has_more    : false,
                        data        : err,
                        itemCount   : 1,
                        pageCount   : 1
                    });
                }

                res.status(200).json({
                    object      : 'object',
                    has_more    : false,
                    data        : data,
                    itemCount   : 1,
                    pageCount   : 1
                });
            });
    },

    adiciona: function (req, res) {
        var dados       = {
            titulo  : req.body.titulo,
            conteudo: req.body.conteudo,
            cadastro: (new Date),
            tipo    : req.body.tipo,
            inicio  : new Date(req.body.inicio),
            fim     : new Date(req.body.fim),
            site    : req.headers.site
        };

        var aviso = new AvisoModel(dados);
        aviso.save(function(err, data) {
            if (err) {
                return res.status(500).json({
                    object      : 'object',
                    has_more    : false,
                    data        : err,
                    itemCount   : 1,
                    pageCount   : 1
                });
            }

            res.status(201).json({
                object      : 'object',
                has_more    : false,
                data        : data,
                itemCount   : 1,
                pageCount   : 1
            });
        });
    },

    atualiza: function (req, res) {
        var dados   = {
            titulo  : req.body.titulo,
            conteudo: req.body.conteudo,
            tipo    : req.body.tipo,
            inicio  : new Date(req.body.inicio),
            fim     : new Date(req.body.fim)
        };

        AvisoModel.update(
            {
                _id: req.params.id,
                site: req.headers.site
            },
            dados,
            function(err, data) {
                if (err) {
                    return res.status(500).json({
                        object      : 'object',
                        has_more    : false,
                        data        : err,
                        itemCount   : 1,
                        pageCount   : 1
                    });
                }

                res.status(204).json(data);
            }
        );
    },

    apaga: function (req, res) {
        AvisoModel.remove({
            _id: req.params.id,
            site: req.headers.site
        }, function(err, data) {
            if (err) {
                return res.status(500).json({
                    object      : 'object',
                    has_more    : false,
                    data        : err,
                    itemCount   : 1,
                    pageCount   : 1
                });
            }

            res.status(204).json(data);
        });
    }
};

module.exports = AvisoController;