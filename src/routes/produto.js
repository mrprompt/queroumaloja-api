'use strict';

var router          = require('express').Router();
var paginate        = require('express-paginate');
var ProdutoModel    = require(__dirname + '/../models/produto');

router.get('/', function (req, res) {
    var filter = {
        site: req.headers.site
    };

    if (req.query.tipo !== undefined) {
        filter.tipo = req.query.tipo;

        if (req.query.categoria !== undefined) {
            filter.categoria = req.query.categoria;
        }
    };

    ProdutoModel.paginate(
        filter,
        {
            page : req.query.page,
            limit: req.query.limit,
            populate: [ 'site' ],
            sortBy: { cadastro: -1 }
        },
        function (err, data, pageCount, itemCount) {
            return res.status(200).json({
                object      : 'list',
                has_more    : paginate.hasNextPages(req)(pageCount),
                data        : data,
                itemCount   : itemCount,
                pageCount   : pageCount
            });
        }
    );
});

router.get('/busca/', function (req, res) {
    var filter = {
        site: req.headers.site
    };

    if (req.query.tipo !== undefined) {
        filter.tipo = req.query.tipo;

        if (req.query.categoria !== undefined) {
            filter.categoria = req.query.categoria;
        }
    };

    ProdutoModel.textSearch(
        req.query.busca,
        filter,
        function(err, data) {
            if (err) {
                return res.status(500).json({
                    object      : 'error',
                    has_more    : false,
                    data        : err,
                    itemCount   : 0,
                    pageCount   : 0
                });
            };

            var items = [];

            data.results.forEach(function(result) {
                items.push(result.obj);

                return result;
            });

            return res.status(200).json({
                object      : 'list',
                has_more    : true,
                data        : items,
                itemCount   : data.stats.nfound,
                pageCount   : 1
            });
        });
});

router.get('/:id', function (req, res) {
    ProdutoModel.findOne({
            _id : req.params.id,
            site: req.headers.site
        })
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

router.post('/', function (req, res) {
    var produto = new ProdutoModel({
        titulo      : req.body.titulo,
        descricao   : req.body.descricao,
        imagem      : (req.body.imagem ? JSON.parse(req.body.imagem) : null ),
        site        : req.headers.site,
        codigo      : req.body.codigo,
        tipo        : req.body.tipo,
        categoria   : req.body.categoria,
        valor       : req.body.valor
    });

    produto.save(function (err, data) {
        res.status(201).json({
            object      : 'object',
            has_more    : false,
            data        : data,
            itemCount   : 1,
            pageCount   : 1
        });
    });
});

router.put('/:id', function (req, res) {
    ProdutoModel.update(
        {
            _id : req.params.id,
            site: req.headers.site
        },
        {
            titulo      : req.body.titulo,
            descricao   : req.body.descricao,
            codigo      : req.body.codigo,
            tipo        : req.body.tipo,
            categoria   : req.body.categoria,
            valor       : req.body.valor,
            imagem      : ( req.body.imagem ? JSON.parse(req.body.imagem) : null )
        },
        function (err, data) {
            res.status(204).json({
                object      : 'object',
                has_more    : false,
                data        : data,
                itemCount   : 1,
                pageCount   : 1
            });
        }
    );
});

router.delete('/:id', function (req, res) {
    ProdutoModel.remove(
        {
            _id : req.params.id,
            site: req.headers.site
        },
        function (err, data) {
            res.status(204).json({
                object      : 'object',
                has_more    : false,
                data        : data,
                itemCount   : 1,
                pageCount   : 1
            });
        }
    );
});

module.exports = router;
