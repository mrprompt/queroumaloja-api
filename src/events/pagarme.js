/**
 * Efetua checagem da transação sempre que um carrinho é criado
 *
 * @author Thiago Paes
 * @package pagarme
 * @licence GPL V3
 */
'use strict';

var path    = require('path');
var pagarme = require(path.join(__dirname, '/../modules/pagarme'));

var router = function(req, res, done) {
    res.app.on('carrinho:adiciona', function(carrinho) {
        pagarme.checaTransacao(carrinho);
    });

    done();
};

module.exports = router;