'use strict';

var http_mocks = require('node-mocks-http');

describe('Site Module', function () {
    before(function() {
        this.module = require('../../modules/site');
    });

    it('Deve prosseguir em busca do site pelo dominio.', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/',
            hostname: 'local.queroumaloja.net',
            app: {}
        });

        this.module(request, response, function() {});

        response.statusCode.should.equal(200);
        response.statusMessage.should.equal('OK');

        done();
    });
});
