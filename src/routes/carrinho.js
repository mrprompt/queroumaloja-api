'use strict';

var router          = require('express').Router();
var paginate        = require('express-paginate');
var CarrinhoModel   = require(__dirname + '/../models/carrinho');

router.get('/:usuario', function (req, res) {
    CarrinhoModel.paginate(
        {
            site    : req.headers.site,
            usuario : req.params.usuario,
            status  : ['ativo', 'pago']
        },
        {
            page: req.query.page,
            limit: req.query.limit
        },
        function (err, data, pageCount, itemCount) {
            res.status(200).json({
                object      : 'list',
                has_more    : paginate.hasNextPages(req)(pageCount),
                data        : data,
                itemCount   : itemCount,
                pageCount   : pageCount
            });
        },
        {
            populate: ['items.produto', 'site', 'usuario'],
            sortBy: {
                cadastro: -1
            }
        }
    );
});

router.get('/:id/:usuario', function (req, res) {
    CarrinhoModel.findOne({
            _id     : req.params.id,
            site    : req.headers.site,
            usuario : req.params.usuario
        })
        .populate(['items.produto', 'site', 'usuario'])
        .exec(function (err, data) {
            res.status(200).json({
                object      : 'object',
                has_more    : false,
                data        : data,
                itemCount   : 1,
                pageCount   : 1
            });
        });
});

router.post('/:usuario', function (req, res) {
    var carrinho = new CarrinhoModel({
        titulo  : (req.body.titulo ? req.body.titulo : 'Sem título'),
        cadastro: (new Date),
        site    : req.headers.site,
        usuario : req.params.usuario
    });
    carrinho.items.push({
            produto     : req.body.produto,
            quantidade  : req.body.quantidade
        });

    carrinho.save(function (err, data) {
        res.status(201).json({
            object      : 'object',
            has_more    : false,
            data        : data,
            itemCount   : 1,
            pageCount   : 1
        });
    });
});

router.put('/:id/:usuario', function (req, res) {
    CarrinhoModel.findOne({
            _id     : req.params.id,
            site    : req.headers.site,
            usuario : req.params.usuario
        })
        .populate(['items.produto', 'site', 'usuario'])
        .exec(function (err, data) {
            data.items.push({
                produto: req.body.produto,
                quantidade: req.body.quantidade
            });

            data.save(function (err, result) {
                res.status(204).json({
                    object      : 'object',
                    has_more    : false,
                    data        : result,
                    itemCount   : 1,
                    pageCount   : 1
                });
            });
        });
});

router.delete('/:id/:usuario', function (req, res) {
    CarrinhoModel.remove({
        _id     : req.params.id,
        site    : req.headers.site,
        usuario : req.params.usuario
    }, function (err, data) {
        res.status(204).json({
            object      : 'object',
            has_more    : false,
            data        : data,
            itemCount   : 1,
            pageCount   : 1
        });
    });
});

module.exports = router;
