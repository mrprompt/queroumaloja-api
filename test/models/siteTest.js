'use strict';

var mockery = require('mockery');

describe('Site DAO', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../schemas/site', {
            paginate: function(x, y, end) {
                end(null, {
                    pages: 0,
                    total: 0,
                    docs: []
                });
            },
            findOne: function(x, end) {
                end(null, {});
            },
            create: function(x, end) {
                end(null, {});
            },
            findOneAndUpdate: function(filter, params, options, end) {
                end(null, {});
            }
        });

        this.model = require('../../models/site');
    });

    after(function() {
        mockery.disable()
    });

    it('#lista', function (done) {
        this.model.lista(1, 10, function() {
            done();
        });
    });

    it('#abre', function (done) {
        this.model.abre(1, function() {
            done();
        });
    });

    it('#adiciona', function (done) {
        this.model.adiciona({}, function() {
            done();
        });
    });

    it('#atualiza', function (done) {
        this.model.atualiza(1, {}, function() {
            done();
        });
    });

    it('#apaga', function (done) {
        this.model.apaga(1, function() {
            done();
        });
    });

    it('#buscaPorDominio', function (done) {
        this.model.buscaPorDominio('http://www.google.com', function() {
            done();
        });
    });
});
