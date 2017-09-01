'use strict';

var http_mocks = require('node-mocks-http');
var mongoose = require('mongoose');

describe('Index Router', function () {
    before(function() {
        this.controller = require('../../routers/index');
    });

    it(' deve retornar um objeto e status 200', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/',
            app: {
                site: {
                    _id: new mongoose.Types.ObjectId()
                }
            }
        });

        this.controller.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        response.statusCode.should.equal(200);
        response.statusMessage.should.equal('OK');

        data.object.should.equal('object');
        data.itemCount.should.equal(1);
        data.pageCount.should.equal(1);

        done();
    });
});
