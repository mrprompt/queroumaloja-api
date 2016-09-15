'use strict';

var mockery = require('mockery');

describe('Connection Module', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('mongoose', {
            Promise: {},
            connect: function(uri) {
                return new Object;
            }
        });
    });

    after(function() {
        mockery.disable()
    });

    it('deve retornar uma objeto mongoose quando process.env.MONGODB_URI estiver definido', function (done) {
        process.env.MONGODB_URI = 'mongodb://foo:bar@127.0.0.1:21017/test';

        var connection = require('../../modules/connection');

        connection.should.is.an.Object;
        connection.mongoose.should.is.an.Object;

        done();
    });
});
