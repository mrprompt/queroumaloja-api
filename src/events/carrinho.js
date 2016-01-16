'use strict';

var mail = require(__dirname + '/../modules/mail');

/**
 *
 * @param req
 * @param res
 * @param done
 */
var router = function(req, res, done) {
    res.app.on('carrinho:adiciona', function(carrinho) {
        mail(carrinho);
    });

    done();
};

module.exports = router;