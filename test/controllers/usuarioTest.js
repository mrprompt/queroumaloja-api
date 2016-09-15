'use strict';

var mongoose = require('mongoose');
var should = require('should');
var mockery = require('mockery');

describe('Usuario Controller', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../models/usuario', {
            lista: function(site, pagina, limite, done) {
                done(null, {
                    page: 0,
                    pages: 0,
                    total: 0,
                    docs: []
                });
            },
            abre: function (id, site, done) {
                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId(),
                    site: new mongoose.Schema.Types.ObjectId(),
                    atualizacao: new Date,
                    cadastro: new Date,
                    quantidade: 0,
                    vendas: 0,
                    album: [],
                    ativo: true,
                    valor: [],
                    codigo: ''
                });
            },
            adiciona: function (site, params, done) {
                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId(),
                    site: new mongoose.Schema.Types.ObjectId(),
                    atualizacao: new Date,
                    cadastro: new Date,
                    quantidade: 0,
                    vendas: 0,
                    album: [],
                    ativo: true,
                    valor: [],
                    codigo: ''
                });
            },
            atualiza: function (id, site, params, done) {
                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId(),
                    site: new mongoose.Schema.Types.ObjectId(),
                    atualizacao: new Date,
                    cadastro: new Date,
                    quantidade: 0,
                    vendas: 0,
                    album: [],
                    ativo: true,
                    valor: [],
                    codigo: ''
                });
            },
            apaga: function (id, site, done) {
                done(null, {
                    _id: new mongoose.Schema.Types.ObjectId(),
                    site: new mongoose.Schema.Types.ObjectId(),
                    atualizacao: new Date,
                    cadastro: new Date,
                    quantidade: 0,
                    vendas: 0,
                    album: [],
                    ativo: true,
                    valor: [],
                    codigo: ''
                });
            }
        });

        this.controller = require('../../controllers/usuario');
    });

    after(function() {
        mockery.disable()
    });

    it('#lista() deve retornar um objeto', function (done) {
        var site = mongoose.Schema.Types.ObjectId();
        var pagina = 1;
        var limite = 1;

        this.controller.lista(site, pagina, limite, function (error, result) {
            result.should.have.property('docs');
            result.should.have.property('total');
            result.should.have.property('page');
            result.should.have.property('pages');

            done();
        });
    });

    it('#abre() deve retornar um objeto', function (done) {
        var id = mongoose.Schema.Types.ObjectId();
        var site = mongoose.Schema.Types.ObjectId();

        this.controller.abre(id, site, function (error, result) {
            should(error).is.be.null();
            should(result).is.be.ok();

            result.should.have.property('_id');

            done();
        });
    });

    it('#adiciona() deve retornar um objeto', function (done) {
        var site = new mongoose.Schema.Types.ObjectId();

        var body = {
            nome: 'foo',
            email: 'foo@bar.bar',
            password: 'foo',
            site: mongoose.Schema.Types.ObjectId()
        };

        this.controller.adiciona(site, body, function (error, result) {
            should(error).not.be.ok();
            should(result).is.be.ok();

            done();
        });
    });

    it('#adiciona() sem nome deve retornar um Erro', function (done) {
        var site = new mongoose.Schema.Types.ObjectId();

        var body = {
            email: 'foo@bar.bar',
            password: 'foo',
            site: mongoose.Schema.Types.ObjectId()
        };

        this.controller.adiciona(site, body, function (error, result) {
            error.should.be.an.instanceOf(Error).and.have.property('message');

            done();
        });
    });

    it('#adiciona() sem email deve retornar um Erro', function (done) {
        var site = new mongoose.Schema.Types.ObjectId();

        var body = {
            nome: 'fooo',
            password: 'foo',
            site: mongoose.Schema.Types.ObjectId()
        };

        this.controller.adiciona(site, body, function (error, result) {
            error.should.be.an.instanceOf(Error).and.have.property('message');

            done();
        });
    });

    it('#adiciona() sem senha deve retornar um Erro', function (done) {
        var site = new mongoose.Schema.Types.ObjectId();

        var body = {
            nome: 'fooo',
            email: 'foo@bar.bar',
            site: mongoose.Schema.Types.ObjectId()
        };

        this.controller.adiciona(site, body, function (error, result) {
            error.should.be.an.instanceOf(Error).and.have.property('message');

            done();
        });
    });

    it('#atualiza() deve retornar um objeto', function (done) {
        var id = mongoose.Schema.Types.ObjectId();
        var site = mongoose.Schema.Types.ObjectId();

        var body = {
            nome: 'foo',
            email: 'foo@bar.bar'
        };

        this.controller.atualiza(id, site, body, function (error, result) {
            should(error).not.be.ok();
            should(result).is.be.ok();

            done();
        });
    });

    it('#atualiza() sem nome deve retornar um Erro', function (done) {
        var id = mongoose.Schema.Types.ObjectId();
        var site = new mongoose.Schema.Types.ObjectId();

        var body = {
            email: 'foo@bar.bar',
            password: 'foo',
            site: mongoose.Schema.Types.ObjectId()
        };

        this.controller.atualiza(id, site, body, function (error, result) {
            error.should.be.an.instanceOf(Error).and.have.property('message');

            done();
        });
    });

    it('#apaga() deve retornar um objeto', function (done) {
        var id = mongoose.Schema.Types.ObjectId();
        var site = mongoose.Schema.Types.ObjectId();

        var body = {
            nome: 'foo',
            email: 'foo@bar.bar'
        };

        this.controller.apaga(id, site, function (error, result) {
            should(error).not.be.ok();
            should(result).is.be.ok();

            done();
        });
    });
});
