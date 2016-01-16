'use strict';

var Pagarme = require('pagarmejs');
var pagarme = new Pagarme('ak_test_KwMAwfL6kGrt3kO9mgNC3qWnvdYe0C');

var api = {
    criar: function (carrinho) {
        pagarme.customer.create({
                document_number: '18152564000105',
                name: 'client name',
                email: 'eee@email.com',
                born_at: '13121988',
                gender: 'M',
                address: {
                    street: 'street name',
                    complementary: 'house',
                    street_number: '13',
                    neighborhood: 'neighborhood name',
                    city: 'city',
                    state: 'SP',
                    zipcode: '05444040',
                    country: 'Brasil'
                },
                phone: {
                    ddi: '55',
                    ddd: '11',
                    number: '999887766'
                }
            })
            .then(function () {
                return pagarme.customer.all();
            })
            .then(console.log)
            .catch(console.log)
    }
};

module.exports = api;