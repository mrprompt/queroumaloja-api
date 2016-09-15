'use strict';

describe('Connection Module', function () {
    xit('deve retornar uma objeto mongoose', function (done) {
        var connection = require('../../modules/connection');

        connection.should.be.an.instanceOf(Error);

        connection.should.is.an.Object;
        connection.mongoose.should.is.an.Object;

        done();
    });

    it('deve retornar uma objeto mongoose quando process.env.MONGODB_URI estiver definido', function (done) {
        process.env.MONGODB_URI = 'mongodb://foo:bar@127.0.0.1:21017/test';

        var connection = require('../../modules/connection');

        connection.should.is.an.Object;
        connection.mongoose.should.is.an.Object;

        done();
    });
});
