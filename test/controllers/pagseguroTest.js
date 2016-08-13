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

        mockery.registerMock('Pagseguro', {
            sender: function() {
                return {
                    set: function() {
                        return true;
                    }
                }
            },
            shipping: function() {
                return {
                    set: function() {
                        return true;
                    }
                }
            },
            product: [],
            checkout: function(dsds) {
                console.log(dsds);
            }
        });

        this.controller = require('../../controllers/pagseguro');
    });

    after(function() {
        mockery.disable();

        process.env.PAGSEGURO_TEST =  null;
    });

    it('#adiciona() deve retornar um array e status 200', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            body: {
                items: [
                    {
                        produto: {
                            _id: 1,
                            descricao: 'foo',
                            titulo: 'Fooo',
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
                            name: 'foo',
                            email: 'foo@bar.bar',
                            token: '5FA879911F844ECABB97416360775DAE'
                        }
                    }
                }
            }
        });

        this.controller.handle(request, response, {});

        should.equal(response.statusCode, 200);
        should.equal(response.statusMessage, 'OK');

        done();
    });
});