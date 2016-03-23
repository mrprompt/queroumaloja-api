'use strict';

const INTERVAL      = 3600000;  // 1 hora

var path            = require('path');
var CarrinhoModel   = require(path.join(__dirname, '/../models/carrinho'));
var pagseguro       = require(path.join(__dirname, '/../modules/pagseguro'));
var mail            = require(path.join(__dirname, '/../modules/mail'));

var api = {
    checaTransacao: function () {
        setInterval(function() {
            CarrinhoModel
                .find(
                    {
                        tipo: 'pagseguro',
                        status: {
                            $in: ['processando', 'aguardando']
                        }
                    }
                )
                .populate(['site', 'items.produto'])
                .then(function (carrinhos) {
                    carrinhos.forEach(function(carrinho) {
                        return pagseguro.checaTransacao(carrinho, carrinho.site, mail.avisoDeCompra);
                    });
                });
        }, INTERVAL);
    }
};

module.exports = api;