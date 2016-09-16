'use strict';

var site = require('../models/site');

var router = function(req, res, done) {
    if (req.method === 'OPTIONS') {
        done();

        return;
    }

    site.buscaPorDominio(req.hostname, function(err, data) {
        if (err || data === null) {
            res.status(404);

            done(new Error('Site não encontrado'));

            return;
        }

        req.app.site = data;

        done();
    });
};

module.exports = router;