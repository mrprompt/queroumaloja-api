'use strict';

var router      = require('express').Router();
var SiteModel   = require('../models/site');

router.all('*', function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();

        return true;
    }

    if (!req.headers.site && !req.query.site) {
        res.status(500).json({
            object      : 'object',
            has_more    : false,
            data        : {
                message : 'Atributo site não encontrado',
                status  : 500
            },
            itemCount   : 0,
            pageCount   : 0
        });

        return false;
    }

    var site = null;

    if (req.headers.site) {
        site = req.headers.site;
    }

    if (req.query.site) {
        site = req.query.site;
    }

    SiteModel
        .findOne({
            _id: site
        })
        .exec(function(err, data) {
            if (err || data === null) {
                res
                    .status(403)
                    .json({
                        object      : 'object',
                        has_more    : false,
                        data        : {
                            message : 'Site não encontrado',
                            status  : 404
                        },
                        itemCount   : 0,
                        pageCount   : 0
                    });

                return false;
            }

            req.app.site = data;

            next();
        });
});

module.exports = router;