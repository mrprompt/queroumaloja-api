'use strict';

var connection  = require(__dirname + '/../test');
var Aviso = require(__dirname + '/../../src/controllers/AvisoController');
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
    it('#lista() deve retornar um array', function (done) {
        request.headers = {
            site: new Site()
        };

        request.query = {
            page: 1,
            limit: 1
        };

        Aviso.lista(request, response, function() {
            assert.equal(response.content.object, 'list');

            done();
        });
    });

    it('#abre() deve retornar um objeto', function (done) {
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

            done();
        });
    });

    it('#adiciona() deve retornar um objeto', function (done) {
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

            done();
        });
    });

    it('#atualiza() deve retornar um objeto', function (done) {
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


            done();
        });
    });

    it('#apaga() deve retornar um objeto', function (done) {
        request.headers = {
            site: new Site()
        };

        request.params = {
            id: 1
        };

        Aviso.apaga(request, response, function() {
            assert.equal(response.content.object, 'error');
            assert.equal(response.statusCode, 500);


            done();
        });
    });
});