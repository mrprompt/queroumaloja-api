'use strict';

var router      = require('express').Router();
var paginate    = require('express-paginate');
var mongoose    = require(__dirname + '/index').mongoose;
var AvisoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        default: ''
    },
    conteudo: {
        type: String,
        default: ''
    },
    tipo: {
        type: String,
        default: 'info'
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    inicio: {
        type: Date,
        default: Date.now
    },
    fim: {
        type: Date,
        default: Date.now
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
}).plugin(require('mongoose-paginate'));
var AvisoModel  = mongoose.model('Aviso', AvisoSchema);

router.get('/', function(req, res) {
    var filter = {
        site: req.headers.authorization
    };

    AvisoModel.paginate(
        filter,
        {
            page: req.query.page,
            limit: req.query.limit
        },
        function (err, data, pageCount, itemCount) {
            return res.status(200).json({
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
    Aviso
        .findOne({
            _id: req.params.id,
            site: req.headers.authorization
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
    var data        = req.body;

    var dataInicio  = data.inicio.split('-');
    var inicio      = new Date(dataInicio[2], (dataInicio[1] - 1), dataInicio[0]);

    var dataFim     = data.fim.split('-');
    var fim         = new Date(dataFim[2], (dataFim[1] - 1), dataFim[0]);

    var dados       = {
        titulo  : data.titulo,
        conteudo: data.conteudo,
        cadastro: (new Date),
        tipo    : data.tipo,
        inicio  : inicio,
        fim     : fim,
        site    : req.headers.authorization
    };

    var aviso = new AvisoModel(dados);
        aviso.save(function(err, data) {
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
    var dados   = {
        titulo  : req.body.titulo,
        conteudo: req.body.conteudo,
        tipo    : req.body.tipo,
    };

    if (req.body.inicio.match(/^\d{2}\-\d{2}\-\d{4}$/)) {
        var dataInicio  = req.body.inicio.split('-');
        var inicio      = new Date(dataInicio[2], (dataInicio[1] - 1), dataInicio[0]);

        dados.inicio    = inicio;
    }

    if (req.body.fim.match(/^\d{2}\-\d{2}\-\d{4}$/)) {
        var dataFim = req.body.fim.split('-');
        var fim     = new Date(dataFim[2], (dataFim[1] - 1), dataFim[0]);

        dados.fim   = fim;
    }

    AvisoModel.update(
        {
            _id: req.params.id,
            site: req.headers.authorization
        },
        dados,
        function(err, data) {
            res.status(204).json(data);
        }
    );
});

router.delete('/:id', function(req, res) {
    AvisoModel.remove({
        _id: req.params.id,
        site: req.headers.authorization
    }, function(err, data) {
        res.status(204).json(data);
    });
});

module.exports = router;
