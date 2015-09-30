'use strict';

var Busca = require('../../src/controllers/BuscaController');
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

describe('Busca Controller', function () {
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
            limit: 1,
            busca: 'livro'
        };

        it('deve retornar um array', function (done) {
            Busca.busca(request, response, function(err, result) {
                assert.equal(response.content.object, 'list');

                done();
            });
        });
    });
});