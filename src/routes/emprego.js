'use strict';

var router          = require('express').Router();
var paginate        = require('express-paginate');
var EmpregoModel    = require(__dirname + '/../models/emprego');

router.get('/', function(req, res) {
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
        function (err, data, pageCount, itemCount) {
            res.status(200).json({
                object: 'list',
                has_more: paginate.hasNextPages(req)(pageCount),
                data: data,
                itemCount: itemCount,
                pageCount: pageCount
            });
        }
    );
});

router.get('/:id', function(req, res) {
    EmpregoModel.findOne({
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
    var emprego = new EmpregoModel({
        titulo      : req.body.titulo,
        descricao   : req.body.descricao,
        cadastro    : (new Date),
        tags        : (req.body.tags ? req.body.tags.split(',') : ''),
        salario     : req.body.salario,
        site        : req.headers.site
    });
    
    emprego.save(function(err, data) {
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
    EmpregoModel.update(
        {
            _id : req.params.id,
            site: req.headers.site
        },
        {
            titulo      : req.body.titulo,
            descricao   : req.body.descricao,
            tags        : (req.body.tags ? req.body.tags.toString().split(',') : ''),
            salario     : req.body.salario
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
    EmpregoModel.remove(
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
