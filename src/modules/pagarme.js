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
            .then(function(transaction) {
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

                    default:
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
                            valor       : transaction.amount || 0
                        },
                        {
                            new: true
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