'use strict';

var Pagarme         = require('pagarmejs');
var pagarme         = new Pagarme(process.env.PAGARME_TOKEN);
var CarrinhoModel   = require(__dirname + '/../models/carrinho');

var api = {
    checaTransacao: function (carrinho) {
        return pagarme
            .transaction
            .findById(carrinho.token)
            .then(function(transaction) {
                var comprador = {
                    nome: transaction.customer.name,
                        email: transaction.customer.email,
                        telefone: transaction.phone.ddd + transaction.phone.number,
                        endereco: {
                        logradouro: transaction.address.street,
                            numero: transaction.address.street_number,
                            complemento: transaction.address.complementary,
                            bairro: transaction.address.neighborhood,
                            cep: transaction.address.zipcode
                    },
                    localidade: {
                        cidade: transaction.address.city,
                            estado: transaction.address.state,
                            uf: transaction.address.state
                    }
                };

                var status = 'aguardando';

                switch (transaction.status) {
                    case 'processing':
                        status = 'processando';
                    break;

                    case 'authorized':
                        status = 'autorizada';
                    break;

                    case 'paid':
                        status = 'pago';
                    break;

                    case 'refunded':
                        status = 'estornada';
                        break;

                    case 'waiting_payment':
                        status = 'aguardando';
                        break;

                    case 'pending_refund':
                        status = 'estornando';
                        break;

                    case 'refused':
                        status = 'recusada';
                        break;
                }

                CarrinhoModel
                    .findOneAndUpdate(
                        {
                            _id         : carrinho._id,
                            site        : carrinho.site
                        },
                        {
                            status      : status,
                            comprador   : comprador,
                            valor       : transaction.amount
                        },
                        function () {
                            return true;
                        }
                    );
            })
            .catch(console.error);
    }
};

module.exports = api;