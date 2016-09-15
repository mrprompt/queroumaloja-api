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
            },
            findOne: function(x) {
                return {
                    populate: function(z) {
                        return {
                            exec: function (done) {
                                done(null, {});
                            }
                        }
                    }
                }
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

    it('#buscaPorConteudo', function (done) {
        this.dao.buscaPorConteudo('foo', 'barbar', function() {
            done();
        });
    });
});
