'use strict';

var connection  = require('../test');
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
    it('#logout() deve retornar um array', function (done) {
        request.headers = {
            site: new Site()
        };

        Logout.logout(request, response, function() {
            assert.equal(response.content.object, 'object');

            done();
        });
    });
});