'use strict';

var mongoose = require('mongoose');
var mockery = require('mockery');

describe('Produto Controller', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../dao/produto', {
            lista: function(site, filtro, done) {
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

        this.controller = require('../../controllers/produto');
    });

    after(function() {
        mockery.disable()
    });

    it('método lista deve retornar um objeto', function (done) {
        var site = mongoose.Schema.Types.ObjectId();
        var params = {
            page: 1,
            limit: 10
        };

        this.controller.lista(site, params, function(error, result) {
            result.should.have.property('docs');
            result.should.have.property('total');
            result.should.have.property('page');
            result.should.have.property('pages');

            done();
        });
    });

    it('método abre deve retornar um objeto do tipo Error', function (done) {
        var site = mongoose.Schema.Types.ObjectId();
        var id = mongoose.Schema.Types.ObjectId();

        this.controller.abre(id, site, function(error, result) {
            result.should.have.property('_id');
            result.should.have.property('site');
            result.should.have.property('atualizacao');
            result.should.have.property('cadastro');
            result.should.have.property('quantidade');
            result.should.have.property('vendas');
            result.should.have.property('album');
            result.should.have.property('ativo');
            result.should.have.property('valor');
            result.should.have.property('codigo');

            done();
        });
    });

    it('#adiciona() deve retornar um objeto', function (done) {
        var site = mongoose.Schema.Types.ObjectId();
        var request = {
            titulo: 'foo',
            descricao: 'bar bar bar',
            imagem: {},
            codigo: 0,
            valor: [ 
                {
                    nome: 'unidade',
                    valor: 1.00,
                    moeda: 'R$'
                }
            ],
            categoria: {
                titulo: 'foo',
                uri: 'foo',
                categoria: {
                    titulo: 'bar',
                    uri: 'bar'
                }
            }
        };

        this.controller.adiciona(site, request, function(error, result) {
            result.should.have.property('_id');
            result.should.have.property('site');
            result.should.have.property('atualizacao');
            result.should.have.property('cadastro');
            result.should.have.property('quantidade');
            result.should.have.property('vendas');
            result.should.have.property('album');
            result.should.have.property('ativo');
            result.should.have.property('valor');
            result.should.have.property('codigo');

            done();
        });
    });

    it('#adiciona() sem titulo deve disparar um erro', function (done) {
        var site = mongoose.Schema.Types.ObjectId();
        var request = {
            descricao: 'bar bar bar',
            imagem: {},
            codigo: 0,
            valor: [ 
                {
                    nome: 'unidade',
                    valor: 1.00,
                    moeda: 'R$'
                }
            ],
            categoria: {
                titulo: 'foo',
                uri: 'foo',
                categoria: {
                    titulo: 'bar',
                    uri: 'bar'
                }
            }
        };

        this.controller.adiciona(site, request, function(error, result) {
            error.should.be.an.instanceOf(Error).and.have.property('message');

            done();
        });
    });

    it('atualizar deve retornar objeto', function (done) {
        var site = mongoose.Schema.Types.ObjectId();
        var id = mongoose.Schema.Types.ObjectId();
        var request = {
            titulo: 'foo',
            descricao: 'bar bar bar',
            imagem: {},
            codigo: 0,
            valor: [ 
                {
                    nome: 'unidade',
                    valor: 1.00,
                    moeda: 'R$'
                }
            ],
            categoria: {
                titulo: 'foo',
                uri: 'foo',
                categoria: {
                    titulo: 'bar',
                    uri: 'bar'
                }
            }
        };

        this.controller.atualiza(id, site, request, function(error, result) {
            result.should.have.property('_id');
            result.should.have.property('site');
            result.should.have.property('atualizacao');
            result.should.have.property('cadastro');
            result.should.have.property('quantidade');
            result.should.have.property('vendas');
            result.should.have.property('album');
            result.should.have.property('ativo');
            result.should.have.property('valor');
            result.should.have.property('codigo');

            done();
        });
    });

    it('atualizar sem título deve retornar objeto do tipo Error', function (done) {
        var site = mongoose.Schema.Types.ObjectId();
        var id = mongoose.Schema.Types.ObjectId();
        var request = {
            descricao: 'bar bar bar',
            imagem: {},
            codigo: 0,
            valor: [ 
                {
                    nome: 'unidade',
                    valor: 1.00,
                    moeda: 'R$'
                }
            ],
            categoria: {
                titulo: 'foo',
                uri: 'foo',
                categoria: {
                    titulo: 'bar',
                    uri: 'bar'
                }
            }
        };

        this.controller.atualiza(id, site, request, function(error, result) {
            error.should.be.an.instanceOf(Error).and.have.property('message');

            done();
        });
    });

    it('apagar com id válido dev retornar um objeto', function (done) {
        var site = mongoose.Schema.Types.ObjectId();
        var id = mongoose.Schema.Types.ObjectId();

        this.controller.apaga(id, site, function(error, result) {
            result.should.have.property('_id');
            result.should.have.property('site');
            result.should.have.property('atualizacao');
            result.should.have.property('cadastro');
            result.should.have.property('quantidade');
            result.should.have.property('vendas');
            result.should.have.property('album');
            result.should.have.property('ativo');
            result.should.have.property('valor');
            result.should.have.property('codigo');

            done();
        });
    });
});
