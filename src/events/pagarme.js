'use strict';

var pagarme = require(__dirname + '/../modules/pagarme');

var router = function(req, res, done) {
    res.app.on('carrinho:adiciona', function(carrinho) {
        pagarme.checaTransacao(carrinho);
    });

    done();
};

module.exports = router;