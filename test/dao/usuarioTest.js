'use strict';

var mongoose = require('mongoose');
var mockery = require('mockery');

describe('Usuario DAO', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../models/usuario', {
            paginate: function(x, y, end) {
                end(null, {
                    page: 0,
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
            update: function(x, y, end) {
                end(null, {});
            },
            findOneAndUpdate: function(filter, params, end) {
                end(null, {});
            }
        });

        this.dao = require('../../dao/usuario');
    });

    after(function() {
        mockery.disable()
    });

    it('#lista', function (done) {
        this.dao.lista(mongoose.Schema.Types.ObjectId(), 2, 3, function(err, result) {
            result.should.have.property('docs');
            result.should.have.property('total');
            result.should.have.property('page');
            result.should.have.property('pages');

            done();
        });
    });

    it('#abre', function (done) {
        var id = mongoose.Schema.Types.ObjectId();
        var site = mongoose.Schema.Types.ObjectId();

        this.dao.abre(id, site, function(err, result) {
            done();
        });
    });

    it('#adiciona', function (done) {
        this.dao.adiciona(mongoose.Schema.Types.ObjectId(1), {}, function() {
            done();
        });
    });

    it('#atualiza', function (done) {
        this.dao.atualiza(mongoose.Schema.Types.ObjectId(1), mongoose.Schema.Types.ObjectId(1), {}, function() {
            done();
        });
    });

    it('#apaga', function (done) {
        this.dao.apaga(mongoose.Schema.Types.ObjectId(1), mongoose.Schema.Types.ObjectId(1), function() {
            done();
        });
    });

    it('#login', function (done) {
        this.dao.login('foo@bar.bar', '$2a$10$MeVpoT66x6r2eNFZ8diZDeBvj2vSjq/Hn6AUIHCKiV7mbU8dBR2OW', mongoose.Schema.Types.ObjectId(1), function() {
            done();
        });
    });
});
