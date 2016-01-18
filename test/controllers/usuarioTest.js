'use strict';

var Usuario = require('../../src/controllers/usuario');
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

describe('Usuario Controller', function () {
    it('#lista() deve retornar um array', function () {
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

        Usuario.lista(request, response, function() {
            assert.equal(response.content.object, 'list');
            assert.equal(response.statusCode, 200);
        });
    });

    it('#abre() deve retornar um objeto', function () {
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

        Usuario.abre(request, response, function() {
            assert.equal(response.content.object, 'error');
            assert.equal(response.statusCode, 404);
        });
    });

    it('#adiciona() deve retornar um objeto', function () {
        this.skip();

        request.headers = {
            site: new Site()
        };

        request.body = {
            nome: 'Foo Bar',
            email: 'foo@bar.bar',
            password: 'foo',
            uf: 'AA',
            estado: 'aaa aaa',
            cidade: 'bbb bbb bb'
        };

        Usuario.adiciona(request, response, function() {
            assert.equal(response.content.object, 'error');
            assert.equal(response.statusCode, 500);
        });
    });

    it('#atualiza() deve retornar um objeto', function () {
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

        Usuario.atualiza(request, response, function() {
            assert.equal(response.content.object, 'error');
            assert.equal(response.statusCode, 500);
        });
    });

    it('#apaga() deve retornar um objeto', function () {
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

        Usuario.apaga(request, response, function() {
            assert.equal(response.content.object, 'error');
            assert.equal(response.statusCode, 500);
        });
    });
});