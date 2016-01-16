'use strict';

var mail = require(__dirname + '/../modules/mail');

var router = function(req, res, done) {
    res.app.on('carrinho:adiciona', function(carrinho) {
        mail.avisoDeCompra(carrinho);
    });

    done();
};

module.exports = router;