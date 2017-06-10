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
            lista: function(site, filtro, done) {
                if (filtro.limit == 0) {
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
                if (!params.titulo) {
                    done(new Error('Erro'));

                    return;
                }

                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId()
                });
            },
            atualiza: function (id, site, params, done) {
                if (!params.titulo || id == 0) {
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

        mockery.registerMock('../middleware/upload', function(req, res, end) {
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
            url: '/produto/',
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

    it('#lista() com filtro por tipo deve retornar um array e status 200', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/produto/',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            },
            query: {
                page: 1,
                limit: 1,
                tipo: 'foo'
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

    it('#lista() com filtro por tipo e categoria deve retornar um array e status 200', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/produto/',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            },
            query: {
                page: 1,
                limit: 1,
                tipo: 'foo',
                categoria: 'barbar'
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

    it('#lista() limite zero deve retornar um erro', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/produto/',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            },
            query: {
                page: 1,
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
            url: '/produto/1',
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

    it('#abre() com id inválido deve retornar um erro e status 500', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/produto/0',
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
            url: '/produto/',
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

    it('#adiciona() sem titulo deve retornar um erro e status 500', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            body: {
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
            url: '/produto/',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            },
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

    it('#atualiza() deve retornar vazio e status 204', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'PUT',
            url: '/produto/1',
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


    it('#atualiza() com id inválido deve retornar um erro e status 500', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'PUT',
            url: '/produto/0',
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

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 500);
        should.equal(response.statusMessage, 'OK');
        should.equal(data.object, 'error');
        should.equal(data.itemCount, 0);
        should.equal(data.pageCount, 0);

        done();
    });

    it('#apaga() deve retornar vazio e status 204', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'DELETE',
            url: '/produto/1',
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

    it('#apaga() com id inválido deve retornar um erro e status 500', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'DELETE',
            url: '/produto/0',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
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
});
