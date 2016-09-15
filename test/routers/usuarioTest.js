'use strict';

var should = require('should'),
    http_mocks = require('node-mocks-http'),
    mockery = require('mockery');
var mongoose = require('mongoose');
    
describe('Usuario Router', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../controllers/usuario', {
            lista: function(site, pagina, limite, done) {
                if (limite == 0 || pagina == 0) {
                    done(new Error('Erro'));

                    return;
                }

                done(null, {
                    pages: 0,
                    total: 0,
                    docs: []
                });
            },
            abre: function(id, site, done) {
                if (id == 0) {
                    done(new Error('Erro'));

                    return;
                }

                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId()
                });
            },
            adiciona: function (site, params, done) {
                if (!params.password) {
                    done(new Error('Erro'));

                    return;
                }

                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId()
                });
            },
            atualiza: function (id, site, params, done) {
                if (id == 0) {
                    done(new Error('Erro'));

                    return;
                }

                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId()
                });
            },
            apaga: function (id, site, done) {
                if (id == 0) {
                    done(new Error('Erro'));

                    return;
                }

                done();
            },
        });

        this.controller = require('../../routers/usuario');
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
                    _id: 1
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

    it('#lista() com limite igual a zero deve retornar um erro e status 500', function (done) {
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
                page: 0,
                limit: 0
            }
        });

        this.controller.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 500);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'error');
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

    it('#abre() com id inválido deve retornar um erro e status 404', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/0',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            }
        });

        this.controller.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 404);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'error');
        should.equal(data.itemCount, 0);
        should.equal(data.pageCount, 0);

        done();
    });

    it('#adiciona() deve retornar um array e status 201', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            body: {
                nome: 'foo',
                email: 'foo@bar.bar',
                password: 'foo',
                password_encrypted: 'fooooo'
            },
            url: '/',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
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

    it('#adiciona() sem senha deve retornar um erro e status 400', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            body: {
                nome: 'foo',
                email: 'foo@bar.bar',
            },
            url: '/',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            }
        });

        this.controller.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 400);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'error');
        should.equal(data.itemCount, 0);
        should.equal(data.pageCount, 0);

        done();
    });

    it('#atualiza() deve retornar um objeto e status 204', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'PUT',
            url: '/1',
            body: {
                nome: 'foo',
                email: 'fo.bar@bar.bar',
            },
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

    it('#atualiza() com id inválido deve retornar um erro e status 400', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'PUT',
            url: '/0',
            body: {
                nome: 'foo',
                email: 'fo.bar@bar.bar',
            },
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            }
        });

        this.controller.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 400);
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

    it('#apaga() com id inválido deve retornar um erro e status 400', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'DELETE',
            url: '/0',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            }
        });

        this.controller.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 400);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'error');
        should.equal(data.itemCount, 0);
        should.equal(data.pageCount, 0);

        done();
    });
});
