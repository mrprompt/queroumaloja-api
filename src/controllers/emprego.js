'use strict';

var paginate            = require('express-paginate');
var EmpregoModel        = require(__dirname + '/../models/emprego');
var EmpregoController   = {
    lista: function (req, res, done) {
        EmpregoModel.paginate(
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

    abre: function (req, res, done) {
        EmpregoModel.findOne({
            _id: req.params.id,
            site: req.headers.site
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
        var emprego = new EmpregoModel({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            cadastro: (new Date),
            tags: (req.body.tags ? req.body.tags.split(',') : ''),
            salario: req.body.salario,
            site: req.headers.site
        });

        emprego.save(function (err, data) {
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
                    data: data,
                    itemCount: 1,
                    pageCount: 1
                });
            }

            done(err, data);
        });
    },

    atualiza: function (req, res, done) {
        EmpregoModel.update(
            {
                _id: req.params.id,
                site: req.headers.site
            },
            {
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                tags: (req.body.tags ? req.body.tags.toString().split(',') : ''),
                salario: req.body.salario
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

    apaga: function (req, res, done) {
        EmpregoModel.remove(
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
}

module.exports = EmpregoController;
