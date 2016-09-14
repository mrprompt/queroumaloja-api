'use strict';

var http_mocks = require('node-mocks-http');
var mongoose = require('mongoose');

describe('Upload Module', function () {
    before(function() {
        this.module = require('../../modules/upload');
    });

    it('com chave inválida deve continuar sem erros', function (done) {
        var response = http_mocks.createResponse();

        var request  = http_mocks.createRequest({
            method: 'POST',
            url: '/',
            app: {
                site: {
                    _id: mongoose.Schema.Types.ObjectId(),
                    config: {
                        cloudinary: {
                            upload_endpoint: 'https://api.cloudinary.com/v1_1/',
                            api_key: 'fooo',
                            api_secret: 'barbarbar',
                            cloud_name: 'foo-barbarbar'
                        }
                    }
                }
            },
            file: {
                path: __filename
            }
        });

        this.module(request, response, function() {});

        response.statusCode.should.equal(200);
        response.statusMessage.should.equal('OK');
        request.should.have.property('body');
        request.body.should.not.have.property('imagem');

        done();
    });
});
