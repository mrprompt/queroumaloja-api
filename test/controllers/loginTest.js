'use strict';

var connection  = require('../test');
var Login = require('../../src/controllers/login');
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

describe('Login Controller', function () {
    it('#adiciona() deve retornar um array', function (done) {
        request.headers = {
            site: new Site()
        };

        request.body = {
            email: 'foo@bar',
            password: 'foobar',
        };

        request.query = {
            page: 1,
            limit: 1
        };

        Login.adiciona(request, response, function() {
            assert.equal(response.content.object, 'object');

            done();
        });
    });
});