'use strict';

var Aviso = require('../../src/controllers/AvisoController');
var Site = require('mongoose').Types.ObjectId;
var sinon = require('sinon');
var assert = require('assert');
var request = require('request');
var response = {
    content: null,
    statusCode: 0,

    json: function(content){
        this.content = content;

        return this;
    },
    status: function(status) {
        this.statusCode = status;

        return this;
    }
};

describe('Aviso Controller', function () {
    before(function(done){
        sinon
            .stub(request, 'get')
            .yields(null, null, JSON.stringify({}));

        done();
    });

    after(function(done){
        request.get.restore();

        done();
    });

    describe('#lista()', function () {
        request.headers = {
            site: new Site()
        };

        request.query = {
            page: 1,
            limit: 1
        };

        it('deve retornar um array', function (done) {
            Aviso.lista(request, response, function(err, result) {
                assert.equal(response.content.object, 'list');

                done();
            });
        });
    });

    describe('#abre()', function () {
        request.headers = {
            site: new Site()
        };

        request.query = {
            page: 1,
            limit: 1
        };

        request.params = {
            id: 1
        };

        it('deve retornar um objeto', function (done) {
            Aviso.abre(request, response, function(err, result) {
                assert.equal(result, undefined);

                done();
            });
        });
    });

    describe('#adiciona()', function () {
        request.headers = {
            site: 'foo'
        };

        request.body = {
            titulo  : 'foo',
            conteudo: 'foo',
            cadastro: (new Date),
            tipo    : 'foo',
            inicio  : new Date(),
            fim     : new Date(),
            site    : new Site()
        };

        it('deve retornar um objeto', function (done) {
            Aviso.adiciona(request, response, function(err, result) {
                assert.equal(response.content.object, 'object');

                done();
            });
        });
    });

    describe('#atualiza()', function () {
        request.headers = {
            site: new Site()
        };

        request.params = {
            id: 1
        };

        request.body = {
            titulo  : 'foo',
            conteudo: 'foo',
            tipo    : 'foo',
            inicio  : new Date(),
            fim     : new Date()
        };

        it('deve retornar um objeto', function (done) {
            Aviso.atualiza(request, response, function(err, result) {
                assert.equal(result.ok, 0);

                done();
            });
        });
    });

    describe('#apaga()', function () {
        request.headers = {
            site: new Site()
        };

        request.params = {
            id: 1
        };

        it('deve retornar um objeto', function (done) {
            Aviso.apaga(request, response, function(err, result) {
                assert.equal(response.content.object, 'object');
                assert.equal(response.content.has_more, false);

                done();
            });
        });
    });
});