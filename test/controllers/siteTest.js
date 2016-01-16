'use strict';

var Site = require('../../src/controllers/site');
var ObjectId = require('mongoose').Types.ObjectId;
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

describe('Site Controller', function () {
    it('#lista() deve retornar um array', function () {
        request.headers = {
            site: new ObjectId()
        };

        request.params = {
            usuario: new ObjectId()
        };

        request.query = {
            page: 1,
            limit: 1
        };

        Site.lista(request, response, function() {
            assert.equal(response.content.object, 'list');
            assert.equal(response.statusCode, 200);
        });
    });

    it('#abre() deve retornar um objeto', function () {
        request.headers = {
            site: new ObjectId()
        };

        request.params = {
            usuario: new ObjectId()
        };

        request.query = {
            page: 1,
            limit: 1
        };

        Site.abre(request, response, function() {
            assert.equal(response.content.object, 'object');
            assert.equal(response.statusCode, 200);
        });
    });

    it('#adiciona() deve retornar um array', function () {
        request.headers = {
            site: new ObjectId()
        };

        request.params = {
            usuario: new ObjectId()
        };

        request.query = {
            page: 1,
            limit: 1
        };

        Site.adiciona(request, response, function() {
            assert.equal(response.content.object, 'object');
            assert.equal(response.statusCode, 201);
        });
    });

    it('#atualiza() deve retornar um objeto', function () {
        request.headers = {
            site: new ObjectId()
        };

        request.params = {
            usuario: new ObjectId(),
            id: 1
        };

        request.query = {
            page: 1,
            limit: 1
        };

        Site.atualiza(request, response, function() {
            assert.equal(response.content.object, 'error');
            assert.equal(response.statusCode, 500);
        });
    });

    it('#apaga() deve retornar um objeto', function () {
        request.headers = {
            site: new ObjectId()
        };

        request.params = {
            usuario: new ObjectId(),
            id: 1
        };

        request.query = {
            page: 1,
            limit: 1
        };

        Site.apaga(request, response, function() {
            assert.equal(response.content.object, 'error');
            assert.equal(response.statusCode, 500);
        });
    });
});