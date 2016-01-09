'use strict';

var connection  = require('../test');
var Equipe = require('../../src/controllers/equipe');
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

describe('Equipe Controller', function () {
    it('#lista() deve retornar um array', function (done) {
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


        Equipe.lista(request, response, function() {
            assert.equal(response.content.object, 'list');

            done();
        });
    });

    it('#abre() deve retornar um objeto', function (done) {
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

        Equipe.abre(request, response, function() {
            assert.equal(response.content.object, 'object');
            assert.equal(response.statusCode, 200);

            done();
        });
    });

    it('#adiciona() deve retornar um array', function (done) {
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

        Equipe.adiciona(request, response, function() {
            assert.equal(response.content.object, 'object');

            done();
        });
    });

    it('#atualiza() deve retornar um objeto', function (done) {
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

        Equipe.atualiza(request, response, function() {
            assert.equal(response.content.object, 'error');

            done();
        });
    });

    it('#apaga() deve retornar um objeto', function (done) {
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

        Equipe.apaga(request, response, function() {
            assert.equal(response.content.object, 'error');

            done();
        });
    });
});