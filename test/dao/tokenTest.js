'use strict';

var mockery = require('mockery');

describe('Token DAO', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../models/token', {
            create: function(x, end) {
                end(null, {});
            }
        });

        this.dao = require('../../dao/token');
    });

    after(function() {
        mockery.disable()
    });

    it('#adiciona', function (done) {
        this.dao.adiciona({}, function() {
            done();
        });
    });
});
