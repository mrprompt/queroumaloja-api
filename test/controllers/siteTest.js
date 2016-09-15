'use strict';

var mongoose = require('mongoose');
var should = require('should');
var mockery = require('mockery');

describe('Site Controller', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../dao/site', {
            lista: function(pagina, limite, done) {
                done(null, {
                    page: 0,
                    pages: 0,
                    total: 0,
                    docs: []
                });
            },
            abre: function (id, done) {
                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId(),
                    atualizacao: new Date,
                    cadastro: new Date,
                    ativo: true
                });
            },
            adiciona: function (params, done) {
                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId(),
                    site: new mongoose.Schema.Types.ObjectId(),
                    atualizacao: new Date,
                    cadastro: new Date,
                    ativo: true
                });
            },
            atualiza: function (id, params, done) {
                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId(),
                    site: new mongoose.Schema.Types.ObjectId(),
                    atualizacao: new Date,
                    cadastro: new Date,
                    ativo: true
                });
            },
            apaga: function (id, done) {
                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId(),
                    site: new mongoose.Schema.Types.ObjectId(),
                    atualizacao: new Date,
                    cadastro: new Date,
                    ativo: false
                });
            }
        });

        this.controller = require('../../controllers/site');
    });

    after(function() {
        mockery.disable()
    });

    it('#lista() deve retornar um array', function (done) {
        var page = 1;
        var limit = 1;

        this.controller.lista(page, limit, function (error, result) {
            result.should.have.property('docs');
            result.should.have.property('total');
            result.should.have.property('page');
            result.should.have.property('pages');

            done();
        });
    });

    it('#abre() deve retornar um objeto', function (done) {
        var id = mongoose.Schema.Types.ObjectId();

        this.controller.abre(id, function(error, result) {
            should(null).is.be.null();
            should(result).is.be.ok();

            done();
        });
    });

    it('#adiciona() deve retornar um array', function (done) {
        var params = {
            nome: 'foo',
            dominio: 'localhost.localdomain',
            emails: [],
            enderecos: [],
            telefones: [],
            categorias: [],
            config: {}
        };

        this.controller.adiciona(params, function(error, result) {
            should(null).is.be.null();
            should(result).is.be.ok();

            done();
        });
    });

    it('#atualiza() deve retornar um objeto', function (done) {
        var id = mongoose.Schema.Types.ObjectId();
        var params = {
            nome: 'foo',
            dominio: 'localhost.localdomain',
            emails: [],
            enderecos: [],
            telefones: [],
            categorias: [],
            config: {}
        };

        this.controller.atualiza(id, params, function(error, result) {
            should(null).is.be.null();
            should(result).is.be.ok();

            done();
        });
    });

    it('#apaga() deve retornar um objeto', function (done) {
        var id = mongoose.Schema.Types.ObjectId();

        this.controller.apaga(id, function(error, result) {
            should(null).is.be.null();
            should(result).is.be.ok();

            done();
        });
    });
});
