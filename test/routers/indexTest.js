'use strict';

var should = require('should'),
    http_mocks = require('node-mocks-http'),
    mockery = require('mockery');

describe('Index Router', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        this.controller = require('../../routers/index');
    });

    after(function() {
        mockery.disable()
    });

    it('#lista() deve retornar um objeto e status 200', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/',
            headers: {
                site: 1
            },
            query: {
                page: 1,
                limit: 1
            },
            app: {
                site: {}
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
