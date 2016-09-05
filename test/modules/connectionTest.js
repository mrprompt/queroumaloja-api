'use strict';

var should = require('should');

describe('Connection Module', function () {
    it('deve retornar uma objeto mongoose', function (done) {
        var connection = require('../../modules/connection');

        should(connection).is.an.Object;
        should(connection.mongoose).is.an.Object;

        done();
    });
});
