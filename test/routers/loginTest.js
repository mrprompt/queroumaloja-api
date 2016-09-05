'use strict';

var should = require('should'),
    http_mocks = require('node-mocks-http'),
    mockery = require('mockery');

describe('Login Router', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        this.controller = require('../../routers/login');
    });

    after(function() {
        mockery.disable()
    });

    it('#adiciona() com usuário válido deve retornar um objeto e status 201', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            url: '/',
            body: {
                email: 'foo@bar.bar',
                password: '1234567890',
                password_encrypted: '$2a$10$MeVpoT66x6r2eNFZ8diZDeBvj2vSjq/Hn6AUIHCKiV7mbU8dBR2OW'
            },
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

    it('#adiciona() com usuário inválido deve retornar um objeto e status 403', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            url: '/',
            headers: {
                site: 1
            },
            body: {
                email: 'foo@bar.br',
                password: '12347890'
            },
            app: {
                site: 1
            }
        });

        this.controller.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 403);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'object');
        should.equal(data.has_more, false);
        should.equal(data.itemCount, 0);
        should.equal(data.pageCount, 1);

        done();
    });
});
