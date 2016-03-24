'use strict';

var Produto, mongoose, ObjectId, should;

Produto = require('../../src/models/produto');
mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;
should = require('should');

describe('Produto Model', function () {
    it('inicia sem erros', function (done) {
        var produto = new Produto();

        should(produto).have.property('id');
        should(produto.isNew).is.exactly(true);
        should(produto.codigo).is.exactly('');
        should(produto.titulo).is.exactly(undefined);
        should(produto.descricao).is.exactly(undefined);
        should(produto.valor).is.exactly(0.00);
        should(produto.ativo).is.exactly(true);
        should(produto.categoria).is.exactly(undefined);
        should(produto.imagem).is.exactly(undefined);
        should(produto.album).is.a.Array();
        should(produto.cadastro).be.instanceOf(Date);
        should(produto.site).is.exactly(undefined);

        done();
    });

    it('iniciando com parâmetros, deve retornar os atributos informados como parâmetros', function (done) {
        var dados = {
            titulo      : 'Quam diu etiam furor iste tuus nos eludet?',
            descricao   : 'Paullum deliquit, ponderibus modulisque suis ratio utitur.',
            imagem      : {},
            site        : new ObjectId(),
            codigo      : 'Petierunt',
            valor       : 0.01,
            categoria   : {
                titulo      : 'Paullum deliquit, ponderibus modulisque suis ratio utitur.',
                uri         : 'http://localhost/',
                categoria   : {
                    titulo  : 'Tu quoque, Brute, fili mi, nihil timor populi, nihil!',
                    uri     : 'Quis aute iure reprehenderit in voluptate velit esse.'
                }
            },
            cadastro: Date.now(),
            album: []
        };

        var produto = new Produto(dados);

        should(produto.isNew).is.exactly(true);
        should(produto).have.property('id');
        should(produto.isNew).is.exactly(true);
        should(produto.codigo).is.exactly(dados.codigo);
        should(produto.titulo).is.exactly(dados.titulo);
        should(produto.descricao).is.exactly(dados.descricao);
        should(produto.valor).is.exactly(dados.valor);
        should(produto.ativo).is.exactly(true);
        should(produto.categoria).is.exactly(dados.categoria);
        should(produto.imagem).is.exactly(dados.imagem);
        should(produto.album).is.a.Array();
        should(produto.cadastro).be.instanceOf(Date);
        should(produto.site).is.exactly(dados.site);

        done();
    });

    it('iniciando com parâmetros e um objeto imagem na propriedade album', function (done) {
        var dados = {
            titulo      : 'Quam diu etiam furor iste tuus nos eludet?',
            descricao   : 'Paullum deliquit, ponderibus modulisque suis ratio utitur.',
            imagem      : {},
            site        : new ObjectId(),
            codigo      : 'Petierunt',
            valor       : 0.01,
            categoria   : {
                titulo      : 'Paullum deliquit, ponderibus modulisque suis ratio utitur.',
                uri         : 'http://localhost/',
                categoria   : {
                    titulo  : 'Tu quoque, Brute, fili mi, nihil timor populi, nihil!',
                    uri     : 'Quis aute iure reprehenderit in voluptate velit esse.'
                }
            },
            cadastro: Date.now(),
            album: [
                {
                    public_id: 'foo',
                    version: 'foo',
                    signature: 'foo',
                    width: 0,
                    height: 0,
                    format: 'foo',
                    resource_type: 'foo',
                    created_at: Date.now(),
                    tags: [],
                    bytes: 0,
                    type: 'foo',
                    etag: 'foo',
                    url: 'foo',
                    secure_url: 'foo'
                }
            ]
        };

        var produto = new Produto(dados);

        should(produto.isNew).is.exactly(true);
        should(produto).have.property('id');
        should(produto.isNew).is.exactly(true);
        should(produto.codigo).is.exactly(dados.codigo);
        should(produto.titulo).is.exactly(dados.titulo);
        should(produto.descricao).is.exactly(dados.descricao);
        should(produto.valor).is.exactly(dados.valor);
        should(produto.ativo).is.exactly(true);
        should(produto.categoria).is.exactly(dados.categoria);
        should(produto.imagem).is.exactly(dados.imagem);
        should(produto.album).is.a.Array();
        should(produto.cadastro).be.instanceOf(Date);
        should(produto.site).is.exactly(dados.site);

        done();
    });

    it('iniciando sem parâmetros, deve permitir adicionar um objeto imagem na propriedade album', function (done) {
        var produto = new Produto();
            produto.album.push({
                public_id: 'foo',
                version: 'foo',
                signature: 'foo',
                width: 0,
                height: 0,
                format: 'foo',
                resource_type: 'foo',
                created_at: Date.now(),
                tags: [],
                bytes: 0,
                type: 'foo',
                etag: 'foo',
                url: 'foo',
                secure_url: 'foo'
            });

        should(produto.isNew).is.exactly(true);
        should(produto).have.property('id');
        should(produto.album).is.a.Array();
        should(produto.cadastro).be.instanceOf(Date);
        should(produto.codigo).is.exactly('');
        should(produto.titulo).is.exactly(undefined);
        should(produto.descricao).is.exactly(undefined);
        should(produto.valor).is.exactly(0.00);
        should(produto.ativo).is.exactly(true);
        should(produto.categoria).is.exactly(undefined);
        should(produto.imagem).is.exactly(undefined);
        should(produto.site).is.exactly(undefined);

        done();
    });

    it('iniciando com parâmetros, deve permitir adicionar um objeto imagem na propriedade album', function (done) {
        var dados = {
            titulo      : 'Quam diu etiam furor iste tuus nos eludet?',
            descricao   : 'Paullum deliquit, ponderibus modulisque suis ratio utitur.',
            imagem      : {},
            site        : new ObjectId(),
            codigo      : 'Petierunt',
            valor       : 0.01,
            categoria   : {
                titulo      : 'Paullum deliquit, ponderibus modulisque suis ratio utitur.',
                uri         : 'http://localhost/',
                categoria   : {
                    titulo  : 'Tu quoque, Brute, fili mi, nihil timor populi, nihil!',
                    uri     : 'Quis aute iure reprehenderit in voluptate velit esse.'
                }
            },
            cadastro: Date.now(),
            album: []
        };

        var produto = new Produto(dados);
            produto.album.push({
                public_id: 'foo',
                version: 'foo',
                signature: 'foo',
                width: 0,
                height: 0,
                format: 'foo',
                resource_type: 'foo',
                created_at: Date.now(),
                tags: [],
                bytes: 0,
                type: 'foo',
                etag: 'foo',
                url: 'foo',
                secure_url: 'foo'
            });

        should(produto.isNew).is.exactly(true);
        should(produto).have.property('id');
        should(produto.isNew).is.exactly(true);
        should(produto.codigo).is.exactly(dados.codigo);
        should(produto.titulo).is.exactly(dados.titulo);
        should(produto.descricao).is.exactly(dados.descricao);
        should(produto.valor).is.exactly(dados.valor);
        should(produto.ativo).is.exactly(true);
        should(produto.categoria).is.exactly(dados.categoria);
        should(produto.imagem).is.exactly(dados.imagem);
        should(produto.album).is.a.Array();
        should(produto.cadastro).be.instanceOf(Date);
        should(produto.site).is.exactly(dados.site);

        done();
    });
});