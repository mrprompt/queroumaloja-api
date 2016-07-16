'use strict';

var should = require('should'),
    http_mocks = require('node-mocks-http'),
    mockery = require('mockery');

describe('Pagseguro Controller Tests', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        process.env.PAGSEGURO_TEST =  true;

        this.controller = require('../../controllers/pagseguro');
    });

    after(function() {
        mockery.disable();

        process.env.PAGSEGURO_TEST =  null;
    });

    it('#adiciona() deve retornar um array e status 201', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            body: {
                items: [
                    {
                        produto: {
                            _id: 1,
                            descricao: 'foo',
                            valor: [
                                {
                                    valor: 100
                                }
                            ]
                        },
                        quantidade: 1
                    }
                ],
                sender: {},
                shipping: {
                    type: 3,
                    cost: 100
                }
            },
            url: '/',
            app: {
                site: {
                    config: {
                        pagseguro: {
                            name: 'lojamodelo',
                            email: 'financeiro@ciadacrianca.ind.br',
                            token: '6DF879901F854EBABB94416360875DAE'
                        }
                    }
                }
            }
        });

        this.controller.handle(request, response, function() {

        });

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 201);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'object');
        should.equal(data.has_more, false);
        should.equal(data.itemCount, 1);
        should.equal(data.pageCount, 1);

        done();
    });
});