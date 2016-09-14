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
            busca: function(site, palavra, done) {
                if (palavra == 'teste') {
                    done(null, {
                        pages: 0,
                        total: 0,
                        docs: []
                    });
                } else {
                    done(new Error('Nada encontrado'), null);
                }
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
            url: '/1/album',
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            },
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

    it('#apaga() deve retornar um objeto e status 204', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'DELETE',
            url: '/1/album/1',
            params: {
                _id: new mongoose.Schema.Types.ObjectId()
            },
            app: {
                site: {
                    _id: new mongoose.Schema.Types.ObjectId()
                }
            }
        });

        this.route.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        should.equal(response.statusCode, 204);
        should.equal(response.statusMessage, 'OK');

        done();
    });
});
