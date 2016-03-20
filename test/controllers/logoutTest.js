'use strict';

var should = require('should'),
    http_mocks = require('node-mocks-http'),
    mockery = require('mockery');

describe('Logout Controller Test', function () {
    before(function() {
        this.skip();

        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('token', {
            generate: function(x, y) {
                return true;
            }
        });

        mockery.registerMock('bcrypt', {
            hashSync: function(x, y) {
                return true;
            }
        });

        mockery.registerMock('../../src/models/usuario', {
            findOne: function(x) {
                return {
                    populate: function() {
                        return {
                            exec: function (end) {
                                end(null, {});
                            }
                        }
                    }
                }
            },
        });

        mockery.registerMock('../../src/models/token', {
            findOne: function(x) {
                return {
                    populate: function() {
                        return {
                            exec: function (end) {
                                end(null, {
                                    _id: Math.random()
                                });
                            }
                        }
                    }
                }
            },
        });

        this.controller = require('../../src/controllers/logout');
    });

    after(function() {
        mockery.disable()
    });

    it('#adiciona() deve retornar um array e status 201', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            url: '/',
            headers: {
                site: 1
            },
            body: {
                email: 'foo@bar.bar',
                password: '1234567890'
            }
        });

        this.controller.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 200);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'object');
        should.equal(data.has_more, false);
        should.equal(data.itemCount, 1);
        should.equal(data.pageCount, 1);

        done();
    });
});