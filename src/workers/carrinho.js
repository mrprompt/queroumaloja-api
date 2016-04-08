'use strict';

const INTERVAL      = process.env.CART_INTERVAL || 3600000;  // 1 hora

var path            = require('path');
var CarrinhoModel   = require(path.join(__dirname, '/../models/carrinho'));
var PagSeguro       = require(path.join(__dirname, '/../modules/pagseguro'));
var PagarMe         = require(path.join(__dirname, '/../modules/pagarme'));
var Mail            = require(path.join(__dirname, '/../modules/mail'));

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

                        switch (carrinho.tipo) {
                            case 'pagseguro':
                                return PagSeguro.checaTransacao(carrinho, carrinho.site, Mail.avisoDeCompra);
                            break;

                            case 'pagarme':
                                return PagarMe.checaTransacao(carrinho, carrinho.site, Mail.avisoDeCompra);
                            break;

                            case 'local':
                                return Mail.avisoDeCompra(carrinho, carrinho.site);
                            break
                        }

                    });
                });
        }, INTERVAL);
    }
};

module.exports = api;