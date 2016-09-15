'use strict';

var http_mocks = require('node-mocks-http');
var mockery = require('mockery');
var mongoose = require('mongoose');
var should = require('should');

describe('Token Module', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../dao/token', {
            buscaPorConteudo: function(conteudo, site, done) {
                if (conteudo === '01ab02cd03de04f') {
                    done(null, {
                        page: 0,
                        pages: 0,
                        total: 0,
                        docs: []
                    });
                } else {
                    done(new Error('Token não encontrado'));
                }
            }
        });

        mockery.registerMock('underscore', {
            contains: function(urls, url) {
                return true;
            }
        });

        this.module = require('../../modules/token');
    });

    after(function() {
        mockery.disable()
    });

    it('Deve prosseguir se for um OPTIONS', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'OPTIONS',
            url: '/'
        });

        this.module(request, response, function(error, data) {
            should(error).is.be.undefined();
            should(data).is.be.undefined();

            done();
        });
    });

    it('Deve parar caso não possua o authorization no header', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/'
        });

        this.module(request, response, function(error, result) {
            error.should.be.an.instanceOf(Error).and.have.property('message');

            should(result).is.be.undefined();

            done();
        });
    });

    it('Deve parar quando não encontra um token válido', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/',
            hostname: 'local.queroumaloja.net',
            headers: {
                authorization: '123123123'
            },
            app: {
                site: {
                    _id: '123123'
                }
            }
        });

        this.module(request, response, function(error, result) {
            error.should.be.an.instanceOf(Error).and.have.property('message');

            should(result).is.be.undefined();

            done();
        });
    });

    it('Deve prosseguir quando encontra um token válido.', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/',
            hostname: 'local.queroumaloja.net',
            headers: {
                authorization: '01ab02cd03de04f'
            },
            app: {
                site: {
                    _id: '123456789'
                }
            }
        });

        this.module(request, response, function(error, result) {
            should(error).is.be.null();
            should(result).is.be.ok();

            done();
        });
    });
});
