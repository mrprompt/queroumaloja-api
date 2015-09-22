'use strict';

var Aviso = require(__dirname + '/../../src/controllers/aviso');
var mockery = require('mockery');
var sinon = require('sinon');
var assert = require('assert');
var http = require('http');

describe('Aviso Controller', function () {
    var requestStub, responseStub;

    before(function(){
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });

        requestStub = sinon.stub(http, 'request');
        requestStub.headers = {
            site: 'blablla'
        };
        requestStub.query = {
            page: 1,
            limit: 10,
        };

        //responseStub = sinon.stub(http, 'response');

        // replace the module `request` with a stub object
        mockery.registerMock('request', requestStub);

        // replace the module `response` with a stub object
        //mockery.registerMock('response', responseStub);
    });

    after(function(){
        mockery.disable();
    });

    describe('#lista() sem array', function () {
        it('deve retornar um array', function (done) {
            var response = Aviso.lista(requestStub, responseStub);
            console.log(responseStub);

            //assert.equal(responseStub.data, 'object');

            done();
        });
    });
});