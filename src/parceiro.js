'use strict';

var router          = require('express').Router();
var pagination      = require('mongoose-paginate');
var paginate        = require('express-paginate');
var mongoose        = require(__dirname + '/index').mongoose;
var ParceiroSchema  = new mongoose.Schema({
    nome: {
        type: String
    },
    imagem: {
        type: Object
    },
    url: {
        type: String
    },
    atuacao: {
        type: String
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
var ParceiroModel   = mongoose.model('Parceiro', ParceiroSchema);

router.get('/', function(req, res) {
    ParceiroModel.paginate(
        {
            site: req.headers.authorization
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
            site: req.headers.authorization
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
        site    : req.headers.authorization
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
            site: req.headers.authorization
        },
        {
            nome    : req.body.nome,
            url     : req.body.url,
            atuacao : req.body.atuacao,
            image   : (req.body.imagem ? JSON.parse(req.body.imagem) : null ),
            cadastro: req.body.cadastro,
            site    : req.headers.authorization
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
            site: req.headers.authorization
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
