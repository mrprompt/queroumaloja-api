'use strict';

var router          = require('express').Router();
var paginate        = require('express-paginate');
var mongoose        = require(__dirname + '/index').mongoose;
var ProdutoSchema   = new mongoose.Schema({
    codigo: {
        type: String,
        default: ''
    },
    titulo: {
        type: String
    },
    descricao: {
        type: String
    },
    tipo: {
        type: String,
        default: ''
    },
    valor: {
        type: Number,
        default: 0.00
    },
    categoria: {
        type: String,
        default: ''
    },
    ativo: {
        type: Boolean,
        default: true
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
}).plugin(require('mongoose-paginate'));
var ProdutoModel    = mongoose.model('Produto', ProdutoSchema);

router.get('/', function (req, res) {
    var filter = {
        site: req.headers.authorization
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
            sortBy: { cadastro: -1 }
        }
    );
});

router.get('/:id', function (req, res) {
    ProdutoModel.findOne({
            _id : req.params.id,
            site: req.headers.authorization
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
        site        : req.headers.authorization,
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
            site: req.headers.authorization
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
            site: req.headers.authorization
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
