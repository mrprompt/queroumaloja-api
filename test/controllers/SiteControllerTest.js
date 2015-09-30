'use strict';

var Site = require('../../src/controllers/SiteController');
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
            site: new ObjectId()
        };

        request.params = {
            usuario: new ObjectId()
        };

        request.query = {
            page: 1,
            limit: 1
        };

        it('deve retornar um array', function (done) {
            Site.lista(request, response, function(err, result) {
                assert.equal(response.content.object, 'list');

                done();
            });
        });
    });

    describe('#abre()', function () {
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

        it('deve retornar um objeto', function (done) {
            Site.abre(request, response, function(err, result) {
                assert.equal(response.content.object, 'error');
                assert.equal(response.statusCode, 500);

                done();
            });
        });
    });

    describe('#adiciona()', function () {
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

        it('deve retornar um array', function (done) {
            Site.adiciona(request, response, function(err, result) {
                assert.equal(response.content.object, 'object');

                done();
            });
        });
    });

    describe('#atualiza()', function () {
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

        it('deve retornar um objeto', function (done) {
            Site.atualiza(request, response, function(err, result) {
                assert.equal(response.content.object, 'error');

                done();
            });
        });
    });

    describe('#apaga()', function () {
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

        it('deve retornar um objeto', function (done) {
            Site.apaga(request, response, function(err, result) {
                assert.equal(response.content.object, 'error');

                done();
            });
        });
    });
});