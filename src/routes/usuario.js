'use strict';

var router       = require('express').Router();
var paginate     = require('express-paginate');
var UsuarioModel = require(__dirname + '/../models/usuario');

router.get('/', function(req, res) {
    UsuarioModel.paginate(
        {
            site: req.headers.site
        },
        {
            page    : req.query.page,
            limit   : req.query.limit,
            populate: [ 'site' ],
            sortBy  : { cadastro: -1 }
        },
        function (err, data, pageCount, itemCount) {
            res.status(200).json({
                object      : 'list',
                has_more    : paginate.hasNextPages(req)(pageCount),
                data        : data,
                itemCount   : itemCount,
                pageCount   : pageCount
            });
        }
    );
});

router.get('/:id', function(req, res) {
    UsuarioModel.findOne(
        {
            _id: req.params.id
        },
        function (err, user) {
            if (err || user === null) {
                return res.status(404).json({
                    object      : 'object',
                    has_more    : false,
                    data        : {
                        status  : 404,
                        message : 'Usuário não encontrado',
                    },
                    itemCount   : 1,
                    pageCount   : 1
                });
            }

            res.status(200).json({
                object      : 'object',
                has_more    : false,
                data        : user,
                itemCount   : 1,
                pageCount   : 1
            });
        }
    ).populate('site');
});

router.post('/', function(req, res) {
    var usuario = new UsuarioModel({
            email   : req.body.email,
            password: req.body.password,
            site    : req.headers.site,
            nome    : req.body.nome,
            localidade: {
                estado: req.body.estado,
                cidade: req.body.cidade
            }
        });

    usuario.save(function(err, user) {
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
            data        : usuario,
            itemCount   : 1,
            pageCount   : 1
        });
    });
});

router.put('/:id', function(req, res) {
    UsuarioModel.update(
        {
            _id : req.params.id,
            site: req.headers.site,
        },
        {

            email   : req.body.email,
            password: req.body.password,
            nome    : req.body.nome,
            localidade: {
                estado: req.body.estado,
                cidade: req.body.cidade
            }
        }
        ,function(err, usuario) {
            if (err) {
                return res.status(500).json({
                    object      : 'object',
                    has_more    : false,
                    data        : err,
                    itemCount   : 1,
                    pageCount   : 1
                });
            }

            res.status(204).json({
                object      : 'object',
                has_more    : false,
                data        : usuario,
                itemCount   : 1,
                pageCount   : 1
            });
        }
    );
});

router.delete('/:id', function(req, res) {
    UsuarioModel.remove(
        {
            _id : req.params.id,
            site: req.headers.site,
        },
        function(err, usuario) {
            if (err) {
                return res.status(500).json({
                    object      : 'object',
                    has_more    : false,
                    data        : err,
                    itemCount   : 1,
                    pageCount   : 1
                });
            }

            res.status(204).json({
                object      : 'object',
                has_more    : false,
                data        : usuario,
                itemCount   : 1,
                pageCount   : 1
            });
        }
    );
});

module.exports = router;
