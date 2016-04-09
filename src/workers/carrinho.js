'use strict';

const INTERVAL      = process.env.CART_INTERVAL || 3600000;  // 1 hora

var CarrinhoModel   = require('../models/carrinho'),
    ProdutoModel    = require('../models/produto'),
    PagSeguro       = require('../modules/pagseguro'),
    PagarMe         = require('../modules/pagarme');

var api = {
    /**
     * Inicia o timer de checagem dos carrinhos em processamento
     *
     */
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
                    if (carrinhos.length === 0) {
                        return;
                    }

                    carrinhos.forEach(function(carrinho) {
                        switch (carrinho.tipo) {
                            case 'pagseguro':
                                return PagSeguro.checaTransacao(carrinho, carrinho.site, api.atualizaProdutos);
                            break;

                            case 'pagarme':
                                return PagarMe.checaTransacao(carrinho, carrinho.site, api.atualizaProdutos);
                            break;
                        }
                    });
                });
        }, INTERVAL);
    },

    /**
     * Percorre os ítens do carrinho e atualiza a quantidade de vendidos e em estoque
     *
     * @param carrinho
     */
    atualizaProdutos: function(carrinho) {
        if (carrinho.status !== 'pago') {
            return;
        }
        
        carrinho.items.forEach(function(item) {
            ProdutoModel
                .findOneAndUpdate(
                    {
                        _id: item.produto
                    },
                    {
                        $inc: {
                            vendas: item.quantidade,
                            quantidade: (item.quantidade - (item.quantidade * 2))
                        }
                    },
                    {
                        new: true
                    },
                    function(err, produto) {
                        console.log('%s atualizado', produto._id);
                    }
                )
        });
    }
};

module.exports = api;