'use strict';

var http_mocks = require('node-mocks-http');
var mongoose = require('mongoose');
var mockery = require('mockery');

describe('Upload Module', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('cloudinary', {
            config: function() {

            },
            uploader: {
                upload: function (dominio, done) {
                    if (dominio == 'foo') {
                        done({
                            imagem: {
                                _id: 'foobarbar'
                            }
                        });
                    }
                }
            }
        });

        this.module = require('../../modules/upload');
    });

    it('deve parar se não tiver um atributo file', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            url: '/'
        });

        this.module(request, response, function() {});

        response.statusCode.should.equal(200);
        response.statusMessage.should.equal('OK');

        done();
    });

    it('deve retornar um json em caso de sucesso', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            url: '/',
            file: {
                path: 'foo'
            }
        });

        this.module(request, response, function() {});

        response.statusCode.should.equal(200);
        response.statusMessage.should.equal('OK');

        request.should.have.property('body');
        request.body.should.have.property('imagem');

        done();
    });
});
