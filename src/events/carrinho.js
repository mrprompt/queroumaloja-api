/**
 * Envia e-mail sempre que um carrinho é criado
 *
 * @author Thiago Paes
 * @package carrinho
 * @licence GPL V3
 */
'use strict';

var path = require('path');
var mail = require(path.join(__dirname, '/../modules/mail'));

var router = function(req, res, done) {
    res.app.on('carrinho:adiciona', function(carrinho) {
        mail.avisoDeCompra(carrinho);
    });

    done();
};

module.exports = router;