/**
 * Envia e-mail sempre que um carrinho é criado
 *
 * @author Thiago Paes
 * @package carrinho
 * @licence GPL V3
 */
'use strict';

var path    = require('path');
var mail    = require(path.join(__dirname, '/../modules/mail'));
var pagarme = require(path.join(__dirname, '/../modules/pagarme'));

var router = function(req, res, done) {
    res.app.on('carrinho:adiciona', function(carrinho) {
        pagarme.checaTransacao(carrinho, req.app.site, mail.avisoDeCompra);
    });

    done();
};

module.exports = router;