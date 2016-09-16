'use strict';

var mockery = require('mockery');

describe('Produto DAO', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../schemas/produto', {
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

        this.model = require('../../models/produto');
    });

    after(function() {
        mockery.disable()
    });
    
    it('#lista', function (done) {
        this.model.lista(1, {}, function() {
            done();
        });
    });

    it('#lista com tipo', function (done) {
        this.model.lista(1, { tipo: 'foo' }, function() {
            done();
        });
    });

    it('#lista com tipo e categoria', function (done) {
        this.model.lista(1, { tipo: 'foo', categoria: 'barbar' }, function() {
            done();
        });
    });

    it('#abre', function (done) {
        this.model.abre(1, 2, function() {
            done();
        });
    });

    it('#adiciona', function (done) {
        this.model.adiciona(1, {}, function() {
            done();
        });
    });

    it('#atualiza', function (done) {
        this.model.atualiza(1, 2, {}, function() {
            done();
        });
    });

    it('#apaga', function (done) {
        this.model.apaga(1, 2, function() {
            done();
        });
    });
});
