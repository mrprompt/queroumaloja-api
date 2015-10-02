'use strict';

var connection  = require('../test');
var Token = require('../../src/controllers/TokenController');
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

describe('Token Controller', function () {
    it('#adiciona() deve retornar um objeto', function (done) {
        request.user = new ObjectId();
        request.user.site = new ObjectId();

        Token.adiciona(request, response, function() {
            assert.equal(response.content.object, 'object');

            done();
        });
    });
});