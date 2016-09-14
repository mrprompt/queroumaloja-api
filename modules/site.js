'use strict';

var SiteDAO = require('../dao/site');

var router = function(req, res, done) {
    if (req.method === 'OPTIONS') {
        done();

        return;
    }

    SiteDAO.buscaPorDominio(req.hostname, function(err, data) {
        if (err || data === null) {
            res
                .status(400)
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

        done();
    });
};

module.exports = router;