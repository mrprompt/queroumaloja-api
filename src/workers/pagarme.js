/**
 * Pagar-me Module
 *
 * @author Thiago Paes
 * @package pagarme
 * @licence GPL V3
 */
'use strict';

const INTERVAL      = 3600000;  // 1 hora

var path            = require('path');
var CarrinhoModel   = require(path.join(__dirname, '/../models/carrinho'));
var pagarme         = require(path.join(__dirname, '/../modules/pagarme'));
var mail            = require(path.join(__dirname, '/../modules/mail'));

var api = {
    checaTransacao: function () {
        setInterval(function() {
            CarrinhoModel
                .find(
                    {
                        status: {
                            $in: ['processando', 'aguardando']
                        }
                    }
                )
                .populate(['site', 'items.produto'])
                .then(function (carrinhos) {
                    carrinhos.forEach(function(carrinho) {
                        return pagarme.checaTransacao(carrinho, carrinho.site, mail.avisoDeCompra);
                    });
                });
        }, INTERVAL);
    }
};

module.exports = api;