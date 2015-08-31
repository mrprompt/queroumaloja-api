'use strict';

var router          = require('express').Router();
var paginate        = require('express-paginate');
var CurriculoModel  = require(__dirname + '/../models/curriculo');

router.get('/', function(req, res) {
    CurriculoModel.paginate(
        {
            site: req.headers.site
        },
        {
            page: req.query.page,
            limit: req.query.limit
        },
        function (err, data, pageCount, itemCount) {
            res.status(200).json({
                object: 'list',
                has_more: paginate.hasNextPages(req)(pageCount),
                data: data,
                itemCount: itemCount,
                pageCount: pageCount
            });
        },
        {
            populate: ['site'],
            sortBy: {
                cadastro: -1
            }
        }
    );
});

router.get('/:id', function(req, res) {
    CurriculoModel.findOne({
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
    var curriculo = new CurriculoModel({
        nome        : req.body.nome,
        email       : req.body.email,
        telefone    : req.body.telefone,
        celular     : req.body.celular,
        escala      : req.body.escala,
        endereco    : req.body.endereco,
        bairro      : req.body.bairro,
        cep         : req.body.cep,
        cidade      : req.body.cidade,
        estado      : req.body.estado,
        observacao  : req.body.observacao,
        cadastro    : req.body.cadastro,
        arquivo     : req.body.arquivo,
        site        : req.headers.site
    });

    curriculo.save(function(err, data) {
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
    CurriculoModel.update(
        {
            _id: req.params.id,
            site: req.headers.site
        },
        req.body,
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
    CurriculoModel.remove(
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
