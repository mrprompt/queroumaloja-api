'use strict';

var should = require('should'),
    http_mocks = require('node-mocks-http'),
    mockery = require('mockery');
var mongoose = require('mongoose');

describe('Imagem Router', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../modules/upload', function(req, res, end) {
            end();
        });

        mockery.registerMock('../controllers/imagem', {
            adiciona: function(produto, site, imagem, done) {
                if (!imagem.url) {
                    done(new Error('Erro fazendo upload'));

                    return;
                }

                done(null, {
                    pages: 0,
                    total: 0,
                    docs: []
                });
            },
            apaga: function (produto, site, imagem, done) {
                if (imagem == 2) {
                    done(new Error('Imagem inválida'));

                    return;
                }

                done(null, {});
            }
        });

        this.route = require('../../routers/imagem');
    });

    after(function() {
        mockery.disable()
    });

    it('#adiciona() deve retornar um array e status 201', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            body: {
                imagem: {
                    url: 'http://localhost'
                }
            },
            url: '/1/album',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            }
        });

        this.route.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 201);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'object');
        should.equal(data.itemCount, 1);
        should.equal(data.pageCount, 1);

        done();
    });

    it('#adiciona() sem atributo imagem.url deve retornar um erro', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            body: {
                imagem: {}
            },
            url: '/1/album',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            }
        });

        this.route.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 500);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'error');
        should.equal(data.itemCount, 0);
        should.equal(data.pageCount, 0);

        done();
    });

    it('#apaga() deve retornar um objeto e status 204', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'DELETE',
            url: '/1/album/1',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            }
        });

        this.route.handle(request, response, function() {});

        should.equal(response.statusCode, 204);
        should.equal(response.statusMessage, 'OK');

        done();
    });

    it('#apaga() com id inválido deve retornar um Erro 500', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'DELETE',
            url: '/1/album/2',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            }
        });

        this.route.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 500);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'error');
        should.equal(data.itemCount, 0);
        should.equal(data.pageCount, 0);

        done();
    });
});
