'use strict';

var router          = require('express').Router();
var pagination      = require('mongoose-paginate');
var paginate        = require('express-paginate');
var mongoose        = require(__dirname + '/index').mongoose;
var EquipeSchema    = new mongoose.Schema({
    nome: {
        type: String
    },
    cargo: {
        type: String
    },
    email: {
        type: String
    },
    imagem: {
        type: Object
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
var EquipeModel     = mongoose.model('Equipe', EquipeSchema);

router.get('/', function(req, res) {
    EquipeModel.paginate(
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
            sortBy: {
                cadastro: -1
            }
        }
    );
});

router.get('/:id', function(req, res) {
    EquipeModel.findOne({
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
    var membro = new EquipeModel({
        nome    : req.body.nome,
        cargo   : req.body.cargo,
        email   : req.body.email,
        imagem  : req.body.imagem,
        site    : req.headers.authorization
    });

    membro.save(function(err, data) {
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
    EquipeModel.update(
        {
            _id : req.params.id,
            site: req.headers.authorization
        },
        {
            nome    : req.body.nome,
            cargo   : req.body.cargo,
            email   : req.body.email,
            imagem  : (req.body.imagem ? JSON.parse(req.body.imagem) : null),
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
    EquipeModel.remove(
        {
            _id : req.params.id,
            site: req.headers.authorization
        }, function(err, data) {
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
