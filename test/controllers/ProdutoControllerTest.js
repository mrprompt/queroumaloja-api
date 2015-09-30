'use strict';

var Produto = require('../../src/controllers/ProdutoController');
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

describe('Produto Controller', function () {
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

        request.params = {
            usuario: new Site()
        };

        request.query = {
            page: 1,
            limit: 1
        };

        it('deve retornar um array', function (done) {
            Produto.lista(request, response, function(err, result) {
                assert.equal(response.content.object, 'list');

                done();
            });
        });
    });

    describe('#abre()', function () {
        request.headers = {
            site: new Site()
        };

        request.params = {
            usuario: new Site()
        };

        request.query = {
            page: 1,
            limit: 1
        };

        it('deve retornar um objeto', function (done) {
            Produto.abre(request, response, function(err, result) {
                assert.equal(response.content.object, 'error');
                assert.equal(response.statusCode, 500);

                done();
            });
        });
    });

    describe('#adiciona()', function () {
        request.headers = {
            site: new Site()
        };

        request.params = {
            usuario: new Site()
        };

        request.query = {
            page: 1,
            limit: 1
        };

        it('deve retornar um array', function (done) {
            Produto.adiciona(request, response, function(err, result) {
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
            usuario: new Site(),
            id: 1
        };

        request.query = {
            page: 1,
            limit: 1
        };

        it('deve retornar um objeto', function (done) {
            Produto.atualiza(request, response, function(err, result) {
                assert.equal(response.content.object, 'error');

                done();
            });
        });
    });

    describe('#apaga()', function () {
        request.headers = {
            site: new Site()
        };

        request.params = {
            usuario: new Site(),
            id: 1
        };

        request.query = {
            page: 1,
            limit: 1
        };

        it('deve retornar um objeto', function (done) {
            Produto.apaga(request, response, function(err, result) {
                assert.equal(response.content.object, 'error');

                done();
            });
        });
    });
});