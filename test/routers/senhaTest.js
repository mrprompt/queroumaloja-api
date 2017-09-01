'use strict';

var should = require('should'),
    http_mocks = require('node-mocks-http'),
    mockery = require('mockery');
var mongoose = require('mongoose');

describe('Senha Router', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../controllers/senha', {
            atualiza: function(usuario, site, senha, done) {
                if (senha == '1234567890') {
                    done(null, {});
                } else {
                    done(new Error('Nada encontrado'));
                }
            }
        });

        this.controller = require('../../routers/senha');
    });

    after(function() {
        mockery.disable()
    });

    it('#atualiza() deve retornar um array e status 204', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'PUT',
            url: '/senha/',
            body: {
                password_encrypted: '1234567890'
            },
            app: {
                site: {
                    _id: new mongoose.Types.ObjectId()
                },
                usuario: {
                    _id: new mongoose.Types.ObjectId()
                }
            }
        });

        this.controller.handle(request, response, function() {});

        should.equal(response.statusMessage, 'OK');

        done();
    });

    it('#atualiza() com senha inválida deve retornar um Erro e status 500', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'PUT',
            url: '/senha/',
            body: {
                password_encrypted: ''
            },
            app: {
                site: {
                    _id: new mongoose.Types.ObjectId()
                },
                usuario: {
                    _id: new mongoose.Types.ObjectId()
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
