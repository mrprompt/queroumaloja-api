'use strict';

var Busca = require('../../src/controllers/busca');
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
    it('#busca() deve retornar um array', function () {
        request.headers = {
            site: new Site()
        };

        request.query = {
            page: 1,
            limit: 1,
            busca: 'livro'
        };

        Busca.busca(request, response, function() {
            assert.equal(response.content.object, 'error');
        });
    });
});