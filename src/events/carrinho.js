'use strict';

var path    = require('path');
var mail    = require(path.join(__dirname, '/../modules/mail'));
var pagarme = require(path.join(__dirname, '/../modules/pagarme'));

var router = function(req, res, done) {
    res.app.on('carrinho:adiciona', function(carrinho) {
        // Se for um carrinho do PagarMe, checo a transação e envio um e-mail
        if (carrinho.tipo == 'pagarme') {
            pagarme.checaTransacao(carrinho, req.app.site, mail.avisoDeCompra);
        }

        // Carrinho local, apenas envio e-mail
        if (carrinho.tipo == 'local') {
            mail.avisoDeCompra(carrinho, req.app.site);
        }
    });

    done();
};

module.exports = router;