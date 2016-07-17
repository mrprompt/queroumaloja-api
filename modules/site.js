'use strict';

var router      = require('express').Router();
var SiteModel   = require('../models/site');

router.all('*', function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();

        return true;
    }

    var hostname = req.hostname
        .replace(/(http.?:\/\/|(www|local|api))\./im, '')
        .replace(/:[0-9]+/m, '');

    SiteModel
        .findOne({
            dominio: hostname
        })
        .exec(function(err, data) {
            if (err || data === null) {
                res
                    .status(400)
                    .json({
                        object      : 'object',
                        has_more    : false,
                        data        : {
                            message : 'Site não encontrado: ' + hostname,
                            status  : 400
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