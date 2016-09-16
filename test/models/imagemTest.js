'use strict';

var mockery = require('mockery');

describe('Imagem DAO', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../schemas/produto', {
            findOneAndUpdate: function(filter, params, options, end) {
                end(null, {});
            }
        });

        this.model = require('../../models/imagem');
    });

    after(function() {
        mockery.disable()
    });

    it('#adicionaImagem', function (done) {
        this.model.adicionaImagem(1, 1, {}, function() {
            done();
        });
    });

    it('#apagaImagem', function (done) {
        this.model.apagaImagem(1, 2, 3, function() {
            done();
        });
    });
});
