'use strict';

var should = require('should'),
    http_mocks = require('node-mocks-http'),
    mockery = require('mockery');

describe('Logout Controller Test', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../../src/models/token', {
            findOne: function(x) {
                return {
                    populate: function() {
                        return []
                    }
                }
            },
            remove: function(x, end) {
                end(null, {});
            }
        });

        this.controller = require('../../src/controllers/logout');
    });

    after(function() {
        mockery.disable()
    });

    it('#adiciona() deve retornar um array e status 204', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'DELETE',
            url: '/',
            headers: {
                site: 1
            },
            app: {
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
});