'use strict';

var path        = require('path'),
    mail        = require(path.join(__dirname, '/../modules/mail')),
    pagarme     = require(path.join(__dirname, '/../modules/pagarme')),
    pagseguro   = require(path.join(__dirname, '/../modules/pagseguro'));

var router = function(req, res, done) {
    res.app.on('carrinho:adiciona', function(carrinho) {
        switch (carrinho.tipo) {
            case 'pagarme':
                pagarme.checaTransacao(carrinho, req.app.site, mail.avisoDeCompra);
                break;

            case 'pagseguro':
                pagarme.checaTransacao(carrinho, req.app.site, mail.avisoDeCompra);
                break;

            case 'local':
                mail.avisoDeCompra(carrinho, req.app.site);
                break;
        }

        done();
    });
};

module.exports = router;