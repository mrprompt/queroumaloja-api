'use strict';

var should = require('should'),
    http_mocks = require('node-mocks-http'),
    mockery = require('mockery');
var mongoose = require('mongoose');

describe('Produto Router', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../controllers/produto', {
            lista: function(site, {}, done) {
                done(null, {
                    pages: 0,
                    total: 0,
                    docs: []
                });
            },
            abre: function(id, site, done) {
                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId()
                });
            },
            adiciona: function (site, params, done) {
                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId()
                });
            },
            atualiza: function (id, site, params, done) {
                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId()
                });
            },
            apaga: function (id, site, params, done) {
                done();
            },
        });

        mockery.registerMock('../modules/upload', function(req, res, end) {
            end();
        });

        this.controller = require('../../routers/produto');
    });

    after(function() {
        mockery.disable()
    });

    it('#lista() deve retornar um array e status 200', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/',
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

        this.controller.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 200);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'list');
        should.equal(data.itemCount, 0);
        should.equal(data.pageCount, 0);

        done();
    });

    it('#abre() deve retornar um objeto e status 200', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/1',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            }
        });

        this.controller.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 200);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'object');
        should.equal(data.itemCount, 1);
        should.equal(data.pageCount, 1);

        done();
    });

    it('#adiciona() deve retornar um array e status 201', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            body: {
                titulo: 'foo',
                descricao: 'bar bar bar',
                imagem: {},
                codigo: 0,
                valor: 1.00,
                categoria: {
                    titulo: 'foo',
                    uri: 'foo',
                    categoria: {
                        titulo: 'bar',
                        uri: 'bar'
                    }
                }
            },
            url: '/',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            },
        });

        this.controller.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 201);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'object');
        should.equal(data.itemCount, 1);
        should.equal(data.pageCount, 1);

        done();
    });

    it('#atualiza() deve retornar um objeto e status 204', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'PUT',
            url: '/1',
            body: {
                titulo: 'foo',
                descricao: 'bar bar bar',
                imagem: {

                },
                codigo: 0,
                valor: {
                    valor: 1.00
                },
                categoria: {
                    titulo: 'foo',
                    uri: 'foo',
                    categoria: {
                        titulo: 'bar',
                        uri: 'bar'
                    }
                },
                dimensoes: {
                    altura: 0,
                    lartura: 0,
                    comprimento: 0,
                    unidade: 'cm'
                },
                peso: {
                    total: 0,
                    unidade: 'kg'
                },
                estoque: 100
            },
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            },
        });

        this.controller.handle(request, response, function() {});

        should.equal(response.statusMessage, 'OK');

        done();
    });

    it('#apaga() deve retornar um objeto e status 204', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'DELETE',
            url: '/1',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            }
        });

        this.controller.handle(request, response, function() {});

        should.equal(response.statusMessage, 'OK');

        done();
    });
});
