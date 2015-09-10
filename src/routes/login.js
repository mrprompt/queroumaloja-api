'use strict';

var router                  = require('express').Router();
var UsuarioModel            = require(__dirname + '/../models/usuario');
var TokenModel              = require(__dirname + '/../models/token');
var token                   = require('token');
    token.defaults.secret   = 'AAB';
    token.defaults.timeStep = (24 * 60 * 60) * 30; // 24h in seconds

router.post('/', function(req, res) {
    UsuarioModel
        .findOne({
            email   : (req.body.email),
            password: (req.body.password)
        })
        .populate('site')
        .exec(function (err, user) {
            if (err || !user || (user.email !== req.body.email || user.password !== req.body.password)) {
                res.status(403).json({
                    object      : 'object',
                    has_more    : false,
                    data        : {
                        message : 'User not found',
                        code    : 403
                    },
                    itemCount   : 1,
                    pageCount   : 1
                });

                return false;
            }

            var usertoken = new TokenModel({
                usuario : user._id,
                tipo    : 'rw',
                cadastro: (new Date()),
                conteudo: token.generate(user._id + '|' + user.site)
            });

            usertoken.save(function(err, data) {
                if (err) {
                    return res.status(500).json({
                        object      : 'object',
                        has_more    : false,
                        data        : err,
                        itemCount   : 1,
                        pageCount   : 1
                    });
                }

                res.status(201).json({
                    object      : 'object',
                    has_more    : false,
                    data        : {
                        usuario : user,
                        token   : data
                    },
                    itemCount   : 1,
                    pageCount   : 1
                });
            });
        });
});

module.exports = router;
