'use strict';

var router          = require('express').Router();
var mongoose        = require(__dirname + '/../modules/connection').mongoose;
var UsuarioSchema   = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
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
});
var UsuarioModel    = mongoose.model('Usuario', UsuarioSchema);

router.post('/', function(req, res) {
    UsuarioModel.findOne(
        {
            email   : req.body.username,
            password: req.body.password
        },
        function (err, user) {
            if (err || user === null) {
                return res.sendStatus(403);
            }

            res.status(200).json({
                object      : 'object',
                has_more    : false,
                data        : user,
                itemCount   : 1,
                pageCount   : 1
            });
        }
    ).populate('site');
});

router.get('/:id', function (req, res) {
    UsuarioModel.findOne(
        {
            _id: req.params.id
        },
        function (err, user) {
            if (err || user === null) {
                return res.sendStatus(404);
            }

            res.status(200).json({
                object      : 'object',
                has_more    : false,
                data        : user,
                itemCount   : 1,
                pageCount   : 1
            });
        }
    ).populate('site');
});

module.exports = router;
