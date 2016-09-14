'use strict';

var http_mocks = require('node-mocks-http');

describe('Token Module', function () {
    before(function() {
        this.module = require('../../modules/token');
    });

    it('Deve prosseguir em busca do token na requisição.', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/',
            hostname: 'local.queroumaloja.net',
            headers: {
                authorization: '01ab02cd03de04f'
            }
        });

        this.module(request, response, function() {});

        response.statusCode.should.equal(200);
        response.statusMessage.should.equal('OK');

        done();
    });

    it('Deve retornar o http status 403 caso não possua o authorization no header', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/'
        });

        this.module(request, response, function() {});

        response.statusCode.should.equal(200);
        response.statusMessage.should.equal('OK');

        done();
    });
});
