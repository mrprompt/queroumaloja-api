'use strict';

var should = require('should'),
    http_mocks = require('node-mocks-http'),
    mockery = require('mockery');

describe('Cors Module', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        this.module = require('../../modules/cors');
    });

    after(function() {
        mockery.disable()
    });

    it('deve retornar os headers corretos', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/',
            query: {}
        });

        this.module(request, response, function() {});

        should.equal(response.statusCode, 200);
        should.equal(response.statusMessage, 'OK');
        should.equal(response._headers['Content-type'], 'application/json');
        should.equal(response._headers['Access-Control-Allow-Origin'], '*');

        done();
    });
});
