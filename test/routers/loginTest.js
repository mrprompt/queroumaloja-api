'use strict';

var http_mocks = require('node-mocks-http');
var mongoose = require('mongoose')
var mockery = require('mockery');

describe('Login Router', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../controllers/login', {
            adiciona: function(email, senha, site, done) {
                if (email == 'foo@bar.bar' && senha == '$2a$10$MeVpoT66x6r2eNFZ8diZDeBvj2vSjq/Hn6AUIHCKiV7mbU8dBR2OW') {
                    done(null, {});
                } else {
                    done(new Error('Nada encontrado'), null);
                }
            }
        });

        this.controller = require('../../routers/login');
    });

    after(function() {
        mockery.disable()
    });

    it('#adiciona() com usuário válido deve retornar um objeto e status 201', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            url: '/login/',
            body: {
                email: 'foo@bar.bar',
                password_encrypted: '$2a$10$MeVpoT66x6r2eNFZ8diZDeBvj2vSjq/Hn6AUIHCKiV7mbU8dBR2OW'
            },
            app: {
                site: {
                    _id: new mongoose.Types.ObjectId()
                }
            }
        });

        this.controller.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        response.statusCode.should.equal(201);
        response.statusMessage.should.equal('OK');

        data.object.should.equal('object');
        data.itemCount.should.equal(1);
        data.pageCount.should.equal(1);

        done();
    });

    it('#adiciona() com usuário inválido deve retornar um objeto e status 403', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            url: '/login/',
            body: {
                email: 'foo@bar.br',
                password_encrypted: '12347890'
            },
            app: {
                site: {
                    _id: 1
                }
            }
        });

        this.controller.handle(request, response, function() {});

        var data = JSON.parse(response._getData());

        response.statusCode.should.equal(404);
        response.statusMessage.should.equal('OK');

        data.object.should.equal('error');
        data.itemCount.should.equal(0);
        data.pageCount.should.equal(1);

        done();
    });
});
