'use strict';

var Logout = require('../../src/controllers/LogoutController');
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

describe('Logout Controller', function () {
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


    describe('#logout()', function () {
        request.headers = {
            site: new Site()
        };

        it('deve retornar um array', function (done) {
            Logout.logout(request, response, function(err, result) {
                assert.equal(response.content.object, 'object');

                done();
            });
        });
    });
});