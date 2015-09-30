'use strict';

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

    describe('#adiciona()', function () {
        request.user = new ObjectId();
        request.user.site = new ObjectId();

        it('deve retornar um objeto', function (done) {
            Token.adiciona(request, response, function(err, result) {
                assert.equal(response.content.object, 'object');

                done();
            });
        });
    });
});