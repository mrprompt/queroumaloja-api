'use strict';

var http_mocks = require('node-mocks-http');
var mockery = require('mockery');

describe('Password Module', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('bcrypt', {
            hashSync: function(content, salt) {
                return '$2a$10$MeVpoT66x6r2eNFZ8diZDeBvj2vSjq/Hn6AUIHCKiV7mbU8dBR2OW';
            }
        });

        mockery.registerMock('underscore', {
            contains: function(urls, url) {
                return true;
            }
        });

        this.module = require('../../modules/password');
    });

    after(function() {
        mockery.disable()
    });

    it('deve restornar com o campo password_encrypted quando possuir a chave password no corpo da requisição', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            url: '/',
            query: {},
            body: {
                password: '1234567890'
            }
        });

        this.module(request, response, function() {});

        response.statusCode.should.equal(200);
        response.statusMessage.should.equal('OK');
        request.body['password_encrypted'].should.equal('$2a$10$MeVpoT66x6r2eNFZ8diZDeBvj2vSjq/Hn6AUIHCKiV7mbU8dBR2OW');

        done();
    });

    it('Deve passar batido caso não exista a propriedade password no corpo da requisição', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            url: '/',
            query: {},
            body: {}
        });

        this.module(request, response, function() {});

        response.statusCode.should.equal(200);
        response.statusMessage.should.equal('OK');
        request.body.should.not.have.property('password_encrypted');

        done();
    });
});
