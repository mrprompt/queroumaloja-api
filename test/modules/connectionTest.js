'use strict';

describe('Connection Module', function () {
    it('deve retornar uma objeto mongoose', function (done) {
        var connection = require('../../modules/connection');

        connection.should.is.an.Object;
        connection.mongoose.should.is.an.Object;

        done();
    });
});
