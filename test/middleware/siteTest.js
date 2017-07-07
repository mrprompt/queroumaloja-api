'use strict';

var http_mocks = require('node-mocks-http');
var mockery = require('mockery');
var mongoose = require('mongoose');

describe('Site Module', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../models/site', {
            buscaPorDominio: function (dominio, done) {
                if (dominio == 'local.queroumaloja.net') {
                    done(null, {
                        _id: new mongoose.Schema.Types.ObjectId(),
                        atualizacao: new Date,
                        cadastro: new Date,
                        ativo: true
                    });
                } else {
                    done(new Error('Site não encontrado.'));
                }
            }
        });

        this.module = require('../../middleware/site');
    });

    it('Deve prosseguir em busca do site pelo dominio.', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/',
            hostname: 'local.queroumaloja.net',
            app: {}
        });

        this.module(request, response, function() {});

        response.statusCode.should.equal(200);
        response.statusMessage.should.equal('OK');

        done();
    });

    it('Deve prosseguir se a requisição for do tipo OPTIONS.', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'OPTIONS',
            url: '/',
            hostname: 'local.queroumaloja.net',
            app: {}
        });

        this.module(request, response, function() {});

        response.statusCode.should.equal(200);
        response.statusMessage.should.equal('OK');

        done();
    });

    it('Deve prosseguir mesmo se o site não for encontrado.', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/',
            hostname: 'local.queroumaloja.combr',
            app: {}
        });

        this.module(request, response, function() {});

        response.statusCode.should.equal(200);
        response.statusMessage.should.equal('OK');

        done();
    });
});
