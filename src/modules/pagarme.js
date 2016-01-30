/**
 * Pagar-me Module
 *
 * @author Thiago Paes
 * @package pagarme
 * @licence GPL V3
 */
'use strict';

var Pagarme         = require('pagarmejs');
var path            = require('path');
var CarrinhoModel   = require(path.join(__dirname, '/../models/carrinho'));

var api = {
    checaTransacao: function (carrinho, site, done) {
        if (site === undefined || site.config[0].pagarme === undefined) {
            return;
        }

        var pagarme = new Pagarme(site.config[0].pagarme.token);

        return pagarme
            .transaction
            .findById(carrinho.token)
            .then(function(transaction, error) {
                if (error) {
                    console.error(error);

                    done();

                    return false;
                }

                var comprador = {
                    nome    : transaction.customer.name,
                    email   : transaction.customer.email,
                    telefone: transaction.phone.ddd + transaction.phone.number,
                    endereco: {
                        logradouro  : transaction.address.street,
                        numero      : transaction.address.street_number,
                        complemento : transaction.address.complementary,
                        bairro      : transaction.address.neighborhood,
                        cep         : transaction.address.zipcode,
                        cidade      : transaction.address.city,
                        estado      : transaction.address.state
                    }
                };

                var status = 'aguardando';

                switch (transaction.status) {
                    case 'processing':
                        status = 'processando';
                    break;

                    case 'authorized':
                        status = 'autorizado';
                    break;

                    case 'paid':
                        status = 'pago';
                    break;

                    case 'refunded':
                        status = 'estornado';
                        break;

                    case 'waiting_payment':
                        status = 'aguardando';
                        break;

                    case 'pending_refund':
                        status = 'estornando';
                        break;

                    case 'refused':
                        status = 'recusado';
                        break;
                }

                CarrinhoModel
                    .findOneAndUpdate(
                        {
                            _id         : carrinho._id
                        },
                        {
                            status      : status,
                            comprador   : comprador,
                            valor       : transaction.amount
                        },
                        function (err, row) {
                            if (err) {
                                console.error(err);

                                return false;
                            }

                            done(row, site);
                        }
                    );
            })
            .catch(console.error);
    }
};

module.exports = api;