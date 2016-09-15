'use strict';

var mongoose = require('mongoose');
var mockery = require('mockery');

describe('Produto Controller', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../models/busca', {
            busca: function(site, palavra, pagina, limite, done) {
                if (palavra == 'test' || palavra == '') {
                    done(null, {
                        page: 0,
                        pages: 0,
                        total: 0,
                        docs: []
                    });
                } else {
                    done(new Error('Nada encontrado'), null);
                }
            }
        });

        this.controller = require('../../controllers/busca');
    });

    after(function() {
        mockery.disable()
    });

    it('busca por palavra chave deve retornar um objeto com os atributos: docs, total, page e pages.', function (done) {
        this.controller.busca(mongoose.Schema.Types.ObjectId(), 'test', function(err, result) {
            result.should.have.property('docs');
            result.should.have.property('total');
            result.should.have.property('page');
            result.should.have.property('pages');

            done();
        });
    });

    it('busca com palavra chave vazia deve retornar um objeto com os atributos: docs, total, page e pages.', function (done) {
        this.controller.busca(mongoose.Schema.Types.ObjectId(), '', function(err, result) {
            result.should.have.property('docs');
            result.should.have.property('total');
            result.should.have.property('page');
            result.should.have.property('pages');

            done();
        });
    });

    it('busca com palavra chave nula deve retornar um objeto do tipo Error com o atributo message.', function (done) {
        this.controller.busca(mongoose.Schema.Types.ObjectId(), null, function(error, result) {
            error.should.be.an.instanceOf(Error).and.have.property('message');

            done();
        });
    });
});
