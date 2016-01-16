'use strict';

var pagarme = require(__dirname + '/../modules/pagarme');

var router = function(req, res, done) {
    res.app.on('carrinho:adiciona', function(carrinho) {
        console.log('checando carrinho no pagarme');

        pagarme.criar(carrinho);
    });

    done();
};

module.exports = router;