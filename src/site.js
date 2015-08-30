'use strict';

var router      = require('express').Router();
var mongoose    = require(__dirname + '/index').mongoose;
var SiteSchema  = new mongoose.Schema({
    nome: {
        type: String
    },
    dominio: {
        type: String
    },
    descricao: {
        type: String
    },
    emails: {
        type: []
    },
    enderecos: {
        type: []
    },
    telefones: {
        type: []
    },
    modulos: {
        type: []
    },
    atuacao: {
        type: []
    },
    servicos: {
        type: []
    }
});
var SiteModel   = mongoose.model('Site', SiteSchema);

router.get('/:id', function(req, res) {
    SiteModel.findOne({
            _id: req.params.id
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

exports.update = function(req, res) {
    SiteModel.update(
        {
        _id: req.site._id,
        },
        {
            nome        : req.body.nome,
            dominio     : req.body.dominio,
            descricao   : req.body.descricao,
            emails      : req.body.emails,
            enderecos   : req.body.enderecos,
            telefones   : req.body.telefones,
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
};

module.exports = router;
