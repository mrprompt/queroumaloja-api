'use strict';

var router          = require('express').Router();
var pagination      = require('mongoose-paginate');
var paginate        = require('express-paginate');
var mongoose        = require(__dirname + '/index').mongoose;
var ClienteSchema   = new mongoose.Schema({
    nome: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    },
    logo: {
        type: String,
        default: ''
    },
    descricao: {
        type: String,
        default: ''
    },
    atuacao: {
        type: String,
        default: ''
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
}).plugin(pagination);
var ClienteModel    = mongoose.model('Cliente', ClienteSchema);

router.get('/', function(req, res) {
    ClienteModel.paginate(
        {
            site: req.headers.authorization
        },
        {
            page: req.query.page,
            limite: req.query.limit
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
            sortBy: {
                cadastro: -1
            }
        }
    );
});

router.get('/:id', function(req, res) {
    var id = req.params.id;

    Cliente
        .findOne({
            _id: id,
            site: req.headers.authorization
        })
        .exec(function(err, result) {
            res.status(200).json({
                object      : 'object',
                has_more    : false,
                data        : result,
                itemCount   : 1,
                pageCount   : 1
            });
        });
});

router.post('/', function(req, res) {
    var cliente = new Cliente({
        nome        : req.body.nome,
        url         : req.body.url,
        logo        : req.body.logo,
        atuacao     : req.body.atuacao,
        descricao   : req.body.descricao,
        cadastro    : req.body.cadastro,
        site        : req.headers.authorization
    });

    ClienteModel.save(function(err, result) {
        res.status(201).json({
            object      : 'object',
            has_more    : false,
            data        : result,
            itemCount   : 1,
            pageCount   : 1
        });
    });
});

router.put('/:id', function(req, res) {
    ClienteModel.update(
        {
            _id : req.params.id,
            site: req.headers.authorization
        },
        req.body,
        function(err, result) {
            res.status(204).json({
                object      : 'object',
                has_more    : false,
                data        : result,
                itemCount   : 1,
                pageCount   : 1
            });
        }
    );
});

router.delete('/:id', function(req, res) {
    ClienteModel.remove(
        {
            _id : req.params.id,
            site: req.headers.authorization
        },
        function(err, result) {
            res.status(204).json({
                object      : 'object',
                has_more    : false,
                data        : result,
                itemCount   : 1,
                pageCount   : 1
            });
        }
    );
});

module.exports = router;
