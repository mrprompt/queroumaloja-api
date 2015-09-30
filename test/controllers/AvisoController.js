'use strict';

var Aviso = require('../../src/controllers/aviso');
var sinon = require('sinon');
var assert = require('assert');
var request = require('request');
var res = {
    json: function(){
        return this;
    },
    status: function() {
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
            site: 'foo'
        };

        request.query = {
            page: 1,
            limit: 1
        };

        it('deve retornar um array', function (done) {
            Aviso.lista(request, res, function(err, result) {
                assert.equal(result, undefined);

                done();
            });
        });
    });

    describe('#abre()', function () {
        request.headers = {
            site: 'foo'
        };

        request.query = {
            page: 1,
            limit: 1
        };

        request.params = {
            id: 1
        };

        it('deve retornar um objeto', function (done) {
            Aviso.abre(request, res, function(err, result) {
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
            site    : 'foo'
        };

        it('deve retornar um objeto', function (done) {
            Aviso.adiciona(request, res, function(err, result) {
                assert.equal(result, undefined);

                done();
            });
        });
    });

    describe('#atualiza()', function () {
        request.headers = {
            site: 'foo'
        };

        request.params = {
            id: 1
        };

        request.body = {
            titulo  : 'foo',
            conteudo: 'foo',
            tipo    : 'foo',
            inicio  : new Date(),
            fim     : new Date(),
            site    : 'foo'
        };

        it('deve retornar um objeto', function (done) {
            Aviso.atualiza(request, res, function(err, result) {
                assert.equal(result.ok, 0);

                done();
            });
        });
    });

    describe('#apaga()', function () {
        request.headers = {
            site: 'foo'
        };

        request.params = {
            id: 1
        };

        it('deve retornar um objeto', function (done) {
            Aviso.apaga(request, res, function(err, result) {
                assert.equal(result, undefined);

                done();
            });
        });
    });
});