'use strict';

var router      = require('express').Router();
var SiteModel   = require('../models/site');

router.all('*', function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();

        return true;
    }

    var site = req.headers.origin.replace(/(http.?:\/\/)/im, '').replace(/www/im, '');

    SiteModel
        .findOne({
            dominio: site
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