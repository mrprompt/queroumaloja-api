'use strict';

var Index = require('../../src/controllers/index');
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

describe('Index Controller', function () {
    it('#lista() deve retornar uma string', function () {
        request.headers = {
            index: new ObjectId()
        };

        request.params = {
            usuario: new ObjectId()
        };

        request.query = {
            page: 1,
            limit: 1
        };

        Index.lista(request, response, function() {
            assert.equal(response.content.object, 'string');
            assert.equal(response.statusCode, 200);
        });
    });
});