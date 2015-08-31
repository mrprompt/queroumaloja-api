'use strict';

var router = require('express').Router();

router.all('*', function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();

        return true;
    }

    if (!req.headers.site) {
        res.status(500).json({
            object      : 'object',
            has_more    : false,
            data        : {
                message : 'Atributo site não encontrado no cabeçalho',
                status  : 500
            },
            itemCount   : 0,
            pageCount   : 1
        });

        return false;
    }

    var SiteModel = require(__dirname + '/../models/site');

    SiteModel.findOne({
        _id: req.headers.site
    })
    .exec(function(err, data) {
        if (err) {
            res.status(404).json({
                object      : 'object',
                has_more    : false,
                data        : {
                    message : 'Site não encontrado',
                    status  : 404
                },
                itemCount   : 0,
                pageCount   : 1
            });

            return false;
        }

        next();
    });
});

module.exports = router;