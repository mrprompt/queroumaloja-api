'use strict';

var should = require('should'),
    http_mocks = require('node-mocks-http'),
    mockery = require('mockery');
var mongoose = require('mongoose');

describe('Busca Router', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../controllers/busca', {
            busca: function(site, palavra, done) {
                if (palavra == 'teste') {
                    done(null, {
                        pages: 0,
                        total: 0,
                        docs: []
                    });
                } else {
                    done(new Error('Nada encontrado'));
                }
            }
        });

        this.route = require('../../routers/busca');
    });

    after(function() {
        mockery.disable()
    });

    it('#busca() deve retornar um array e status 200', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/teste',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            },
            query: {
                page: 1,
                limit: 1
            }
        });

        this.route.handle(request, response);

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 200);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'list');
        should.equal(data.itemCount, 0);
        should.equal(data.pageCount, 0);

        done();
    });

    it('#busca() com palavra chave inexistente deve retornar um array e status 500', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/xublau',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            },
            query: {
                page: 1,
                limit: 1
            }
        });

        this.route.handle(request, response);

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 500);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'error');
        should.equal(data.itemCount, 0);
        should.equal(data.pageCount, 0);

        done();
    });
});
