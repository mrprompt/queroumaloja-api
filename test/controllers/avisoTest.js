'use strict';

var Aviso = require(__dirname + '/../../src/controllers/aviso');
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
    it('#lista() deve retornar um array', function () {
        request.headers = {
            site: new Site()
        };

        request.query = {
            page: 1,
            limit: 1
        };

        Aviso.lista(request, response, function() {
            assert.equal(response.content.object, 'list');
            assert.equal(response.statusCode, 200);
        });
    });

    it('#abre() deve retornar um objeto', function () {
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

        Aviso.abre(request, response, function() {
            assert.equal(response.content.object, 'error');
            assert.equal(response.statusCode, 500);
        });
    });

    it('#adiciona() deve retornar um objeto', function () {
        request.headers = {
            site: new Site()
        };

        request.body = {
            titulo  : 'foo',
            conteudo: 'foo',
            tipo    : 'foo'
        };

        Aviso.adiciona(request, response, function() {
            assert.equal(response.content.object, 'object');
            assert.equal(response.statusCode, 201);
        });
    });

    it('#atualiza() deve retornar um objeto', function () {
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

        Aviso.atualiza(request, response, function() {
            assert.equal(response.content.object, 'error');
            assert.equal(response.statusCode, 500);
        });
    });

    it('#apaga() deve retornar um objeto', function () {
        request.headers = {
            site: new Site()
        };

        request.params = {
            id: 1
        };

        Aviso.apaga(request, response, function() {
            assert.equal(response.content.object, 'error');
            assert.equal(response.statusCode, 500);
        });
    });
});