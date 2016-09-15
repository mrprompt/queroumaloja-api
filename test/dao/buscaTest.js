'use strict';

var mockery = require('mockery');

describe('Busca DAO', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../models/produto', {
            paginate: function(filtro, params, end) {
                end(null, {
                    pages: 0,
                    total: 0,
                    docs: []
                });
            }
        });

        this.dao = require('../../dao/busca');
    });

    after(function() {
        mockery.disable()
    });

    it('#busca', function (done) {
        this.dao.busca(1, 'foo', 1, 10, function() {
            done();
        });
    });
});
