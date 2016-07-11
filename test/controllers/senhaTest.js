'use strict';

var should = require('should'),
    http_mocks = require('node-mocks-http'),
    mockery = require('mockery');

describe('Senha Controller', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        process.env.PASSWORD_SALT = 'foo';

        mockery.registerMock('bcrypt', {
            hashSync: function(x, y) {
                return '1234567890';
            }
        });

        mockery.registerMock('uniqid', function() {
            return '1234567890';
        });

        mockery.registerMock('../../models/usuario', {
            findOneAndUpdate: function(filter, update, options, done) {
                return done(null, {
                    _id: parseInt(Math.random()),
                    email: filter.email
                });
            }
        });

        this.controller = require('../../controllers/senha');
    });

    after(function() {
        mockery.disable()
    });

    it('#atualiza() deve retornar um array e status 204', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'PUT',
            url: '/',
            headers: {
                site: 1
            },
            body: {
                password: '1234567890'
            },
            app: {
                site: {
                    _id: 1
                },
                usuario: {
                    _id: 1
                }
            }
        });

        this.controller.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 204);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'object');
        should.equal(data.has_more, false);
        should.equal(data.itemCount, 1);
        should.equal(data.pageCount, 1);

        done();
    });

    it('#adiciona() deve retornar um array e status 201', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            url: '/1',
            headers: {
                site: 1
            },
            body: {},
            app: {
                site: {
                    _id: 1
                }
            }
        });

        this.controller.handle(request, response, function() {});

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