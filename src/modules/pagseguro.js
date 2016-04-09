'use strict';

var Pagseguro = require('pagseguro.js'),
    CarrinhoModel = require('../models/carrinho');

var api = {
    checaTransacao: function (carrinho, done) {
        if (carrinho.site === undefined || carrinho.site.config.pagseguro === undefined) {
            return;
        }

        var compra = Pagseguro({
            'name' : carrinho.site.config.pagseguro.name,
            'email': carrinho.site.config.pagseguro.email,
            'token': carrinho.site.config.pagseguro.token
        });
        
        return compra.transactions(carrinho.token, function(error, response, transaction) {
                if (error || response.statusCode === 404 || transaction === undefined) {
                    transaction = {
                        status: 7,
                        grossAmount: 0
                    };
                }

                var status = 'aguardando';

                switch (transaction.status) {
                    case 2:
                    case 5:
                        status = 'processando';
                    break;

                    case 3:
                    case 4:
                        status = 'pago';
                    break;

                    case 6:
                    case 8:
                        status = 'estornado';
                        break;

                    case 1:
                        status = 'aguardando';
                        break;

                    case 9:
                        status = 'estornando';
                        break;

                    case 7:
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
                            valor       : transaction.grossAmount
                        },
                        {
                            new: true
                        },
                        function (err, row) {
                            if (err) {
                                console.error(err);

                                return false;
                            }

                            done(row);
                        }
                    );
            })
            .catch(console.error);
    }
};

module.exports = api;