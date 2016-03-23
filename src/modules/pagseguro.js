'use strict';

var Pagseguro = require('pagseguro.js'),
    CarrinhoModel = require('../models/carrinho');

var api = {
    checaTransacao: function (carrinho, site, done) {
        if (site === undefined || site.config[0].pagseguro === undefined) {
            return;
        }

        var pagseguro = new Pagseguro();

        var compra = Pagseguro({
            'name' : site.config[0].pagseguro.loja,
            'email': site.config[0].pagseguro.email,
            'token': site.config[0].pagseguro.token
        });
        
        return compra.transactions(carrinho.token, function(error, response, transaction) {
                if (error || response.statusCode === 404) {
                    console.error(error);

                    done();

                    return false;
                }

                var comprador = {
                    nome    : transaction.sender.name,
                    email   : transaction.sender.email,
                    telefone: transaction.sender.phone.areaCode + transaction.sender.phone.number,
                    endereco: {
                        logradouro  : transaction.shipping.address.street,
                        numero      : transaction.shipping.address.number,
                        complemento : transaction.shipping.address.complement,
                        bairro      : transaction.shipping.address.district,
                        cep         : transaction.shipping.address.postalCode,
                        cidade      : transaction.shipping.address.city,
                        estado      : transaction.shipping.address.state
                    }
                };

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
                }

                CarrinhoModel
                    .findOneAndUpdate(
                        {
                            _id         : carrinho._id
                        },
                        {
                            status      : status,
                            comprador   : comprador,
                            valor       : transaction.grossAmount
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