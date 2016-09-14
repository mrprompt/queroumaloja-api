'use strict';

var should = require('should'),
    http_mocks = require('node-mocks-http'),
    mockery = require('mockery');
var mongoose = require('mongoose');

describe('Site Router', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../controllers/site', {
            lista: function(pagina, limite, done) {
                done(null, {
                    pages: 0,
                    total: 0,
                    docs: []
                });
            },
            abre: function(id, done) {
                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId()
                });
            },
            adiciona: function (params, done) {
                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId()
                });
            },
            atualiza: function (id, params, done) {
                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId()
                });
            },
            apaga: function (id, params, done) {
                done();
            },
        });

        this.controller = require('../../routers/site');
    });

    after(function() {
        mockery.disable()
    });

    it('#lista() deve retornar um array e status 200', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/',
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
            headers: {
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
                nome: 'foo',
                dominio: 'localhost.localdomain',
                emails: [],
                enderecos: [],
                telefones: [],
                categorias: [],
                config: {}
            },
            url: '/',
            headers: {
                site: 1
            }
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

    it('#adiciona() com categoria deve retornar um array e status 201', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            body: {
                nome: 'foo',
                dominio: 'localhost.localdomain',
                emails: [],
                enderecos: [],
                telefones: [],
                categorias: [
                    {
                        titulo: 'teste',
                        urdi: 'teste'
                    }
                ]
            },
            url: '/',
            headers: {
                site: 1
            }
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
            params: {
                id: 1
            },
            body: {
                nome: 'foo',
                dominio: 'localhost.localdomain',
                emails: [],
                enderecos: [],
                telefones: [],
                categorias: []
            },
            headers: {
                site: 1
            }
        });

        this.controller.handle(request, response, function() {});

        should.equal(response.statusMessage, 'OK');

        done();
    });

    it('#apaga() deve retornar um objeto e status 204', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'DELETE',
            url: '/1'
        });

        this.controller.handle(request, response, function() {});

        should.equal(response.statusMessage, 'OK');

        done();
    });
});
