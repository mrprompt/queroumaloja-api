'use strict';

var router      = require('express').Router();
var paginate    = require('express-paginate');
var SlideModel  = require(__dirname + '/../models/slide');

router.get('/', function(req, res) {
    SlideModel.paginate(
        {
            site: req.headers.site
        },
        {
            page: req.query.page,
            limit: req.query.limit,
            populate: [ 'site' ],
            sortBy: { cadastro: -1 }
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
    SlideModel.findOne({
            _id : req.params.id,
            site: req.headers.site
        })
        .exec(function(err, data) {
            res.status(200).json({
                object      : 'object',
                has_more    : false,
                data        : data,
                itemCount   : 1,
                pageCount   : 1
            });
        });
});

router.post('/', function(req, res) {
    var slide = new SlideModel({
        titulo      : req.body.titulo,
        descricao   : req.body.descricao,
        endereco    : req.body.endereco,
        imagem      : (req.body.imagem ? JSON.parse(req.body.imagem) : null),
        cadastro    : req.body.cadastro,
        site        : req.headers.site
    });

    slide.save(function(err, data) {
        res.status(201).json({
            object      : 'object',
            has_more    : false,
            data        : data,
            itemCount   : 1,
            pageCount   : 1
        });
    });
});

router.put('/:id', function(req, res) {
    var dados = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        endereco: req.body.endereco
    }

    if (req.body.imagem) {
        dados.imagem = JSON.parse(req.body.imagem);
    }

    SlideModel.update(
        {
            _id : req.params.id,
            site: req.headers.site
        },
        dados,
        function(err, data) {
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

router.delete('/:id', function(req, res) {
    SlideModel.remove(
        {
            _id : req.params.id,
            site: req.headers.site
        },
        function(err, data) {
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
