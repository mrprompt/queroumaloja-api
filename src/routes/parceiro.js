'use strict';

var router          = require('express').Router();
var paginate        = require('express-paginate');
var ParceiroModel   = require(__dirname + '/../models/parceiro');

router.get('/', function(req, res) {
    ParceiroModel.paginate(
        {
            site: req.headers.site
        },
        {
            page : req.query.page,
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
            populate: [ 'site' ],
            sortBy: {cadastro: -1}
        }
    );
});

router.get('/:id', function(req, res) {
    ParceiroModel.findOne({
            _id : req.params.id,
            site: req.headers.site
        })
        .populate(['site'])
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
    var parceiro = new ParceiroModel({
        nome    : req.body.nome,
        imagem  : (req.body.imagem ? JSON.parse(req.body.imagem) : ''),
        url     : req.body.url,
        atuacao : req.body.atuacao,
        cadastro: req.body.cadastro,
        site    : req.headers.site
    });

    parceiro.save(function(err, data) {
        res.status(200).json({
            object      : 'object',
            has_more    : false,
            data        : data,
            itemCount   : 1,
            pageCount   : 1
        });
    });
});

router.put('/:id', function(req, res) {
    ParceiroModel.update(
        {
            _id : req.params.id,
            site: req.headers.site
        },
        {
            nome    : req.body.nome,
            url     : req.body.url,
            atuacao : req.body.atuacao,
            image   : (req.body.imagem ? JSON.parse(req.body.imagem) : null ),
            cadastro: req.body.cadastro,
            site    : req.headers.site
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

router.delete('/:id', function(req, res) {
    ParceiroModel.remove(
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
