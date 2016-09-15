'use strict';

var mockery = require('mockery');

describe('Site DAO', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../models/site', {
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

        this.dao = require('../../dao/site');
    });

    after(function() {
        mockery.disable()
    });

    it('#lista', function (done) {
        this.dao.lista(1, 10, function() {
            done();
        });
    });

    it('#abre', function (done) {
        this.dao.abre(1, function() {
            done();
        });
    });

    it('#adiciona', function (done) {
        this.dao.adiciona({}, function() {
            done();
        });
    });

    it('#atualiza', function (done) {
        this.dao.atualiza(1, {}, function() {
            done();
        });
    });

    it('#apaga', function (done) {
        this.dao.apaga(1, function() {
            done();
        });
    });

    it('#buscaPorDominio', function (done) {
        this.dao.buscaPorDominio('http://www.google.com', function() {
            done();
        });
    });
});
