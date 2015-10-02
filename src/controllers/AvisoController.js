'use strict';

var paginate        = require('express-paginate');
var AvisoModel      = require(__dirname + '/../models/aviso');
var AvisoController = {
    lista: function (req, res, done) {
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
                    res.status(500).json({
                        object      : 'error',
                        has_more    : false,
                        data        : err,
                        itemCount   : 1,
                        pageCount   : 1
                    });
                } else {
                    res.status(200).json({
                        object      : 'list',
                        has_more    : paginate.hasNextPages(req)(pageCount),
                        data        : data,
                        itemCount   : itemCount,
                        pageCount   : pageCount
                    });
                }

                done(err, data);
            }
        );
    },

    abre: function (req, res, done) {
        AvisoModel
            .findOne({
                _id: req.params.id,
                site: req.headers.site
            })
            .exec(function(err, data) {
                if (err) {
                    res.status(500).json({
                        object      : 'error',
                        has_more    : false,
                        data        : err,
                        itemCount   : 1,
                        pageCount   : 1
                    });
                } else {
                    res.status(200).json({
                        object      : 'object',
                        has_more    : false,
                        data        : data,
                        itemCount   : 1,
                        pageCount   : 1
                    });
                }

                done(err, data);
            });
    },

    adiciona: function (req, res, done) {
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
                    res.status(500).json({
                        object      : 'error',
                        has_more    : false,
                        data        : err,
                        itemCount   : 1,
                        pageCount   : 1
                    });
                } else {
                    res.status(201).json({
                        object      : 'object',
                        has_more    : false,
                        data        : data,
                        itemCount   : 1,
                        pageCount   : 1
                    });
                }

                done(err, data);
            });
    },

    atualiza: function (req, res, done) {
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
                    res.status(500).json({
                        object      : 'error',
                        has_more    : false,
                        data        : err,
                        itemCount   : 1,
                        pageCount   : 1
                    });
                } else {
                    res.status(204).json(data);
                }

                done(err, data);
            }
        );
    },

    apaga: function (req, res, done) {
        AvisoModel.remove({
            _id: req.params.id,
            site: req.headers.site
        }, function(err, data) {
            if (err) {
                res.status(500).json({
                    object      : 'error',
                    has_more    : false,
                    data        : err,
                    itemCount   : 1,
                    pageCount   : 1
                });
            } else {
                res.status(204).json(data);
            }

            done(err, data);
        });
    }
};

module.exports = AvisoController;