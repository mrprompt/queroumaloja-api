'use strict';

var Produto, mongoose, ObjectId, should;

Produto = require('../../models/produto');
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
        should(produto.valor).is.a.Array();
        should(produto.quantidade).is.exactly(0);
        should(produto.ativo).is.exactly(true);
        should(produto.categoria).is.exactly(undefined);
        should(produto.imagem).is.exactly(undefined);
        should(produto.album).is.a.Array();
        should(produto.album.length).is.exactly(0);
        should(produto.site).is.exactly(undefined);
        should(produto.dimensoes).is.exactly(undefined);
        should(produto.peso).is.exactly(undefined);
        should(produto.cadastro).be.instanceOf(Date);
        should(produto.atualizacao).be.instanceOf(Date);

        done();
    });

    it('iniciando com parâmetros, deve retornar os atributos informados como parâmetros', function (done) {
        var imagem = {
            public_id: 'xxx',
            version: 1,
            signature: 'xx',
            width: 100,
            height: 100,
            format: 'jpeg',
            resource_type: 'foo',
            created_at: (new Date),
            tags: [],
            bytes: 1,
            type: 'image',
            etag: 'foo',
            url: 'foo',
            secure_url: 'foo'
        };

        var dados = {
            titulo      : 'Quam diu etiam furor iste tuus nos eludet?',
            descricao   : 'Paullum deliquit, ponderibus modulisque suis ratio utitur.',
            imagem      : imagem,
            site        : new ObjectId(),
            codigo      : 'Petierunt',
            valor       : [
                {
                    valor: 0.01,
                    nome: 'principal',
                    moeda: 'R$'
                }
            ],
            quantidade     : 100,
            valores: [
                {
                    nome: 'promoção',
                    valor: 0.01
                },
                {
                    nome: 'desconto',
                    valor: 0.02
                }
            ],
            categoria   : {
                titulo      : 'Paullum deliquit, ponderibus modulisque suis ratio utitur.',
                uri         : 'paullum-deliquit'
            },
            cadastro: Date.now(),
            album: [imagem]
        };

        var produto = new Produto(dados);

        should(produto).have.property('id');
        should(produto.isNew).is.exactly(true);
        should(produto.codigo).is.exactly(dados.codigo);
        should(produto.titulo).is.exactly(dados.titulo);
        should(produto.descricao).is.exactly(dados.descricao);
        should(produto.valor).is.a.Array();
        should(produto.quantidade).is.exactly(dados.quantidade);
        should(produto.ativo).is.exactly(true);
        should(produto.categoria).is.a.Object();
        should(produto.imagem).is.a.Object();
        should(produto.album).is.a.Array();
        should(produto.album.length).is.exactly(1);
        should(produto.cadastro).be.instanceOf(Date);
        should(produto.site).is.exactly(dados.site);

        done();
    });

    it('iniciando com parâmetros e um objeto imagem na propriedade album', function (done) {
        var dados = {
            titulo      : 'Quam diu etiam furor iste tuus nos eludet?',
            descricao   : 'Paullum deliquit, ponderibus modulisque suis ratio utitur.',
            imagem      : {
                public_id: 'xxx',
                version: 1,
                signature: 'xx',
                width: 100,
                height: 100,
                format: 'jpeg',
                resource_type: 'foo',
                created_at: (new Date),
                tags: [],
                bytes: 1,
                type: 'image',
                etag: 'foo',
                url: 'foo',
                secure_url: 'foo'
            },
            site        : new ObjectId(),
            codigo      : 'Petierunt',
            valor: [
                {
                    nome: 'promoção',
                    valor: 0.01
                },
                {
                    nome: 'desconto',
                    valor: 0.02
                }
            ],
            categoria   : {
                titulo: 'Paullum deliquit, ponderibus modulisque suis ratio utitur.',
                uri: 'lalala'
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
            ],
            quantidade: 1000
        };

        var produto = new Produto(dados);

        should(produto.isNew).is.exactly(true);
        should(produto).have.property('id');
        should(produto.isNew).is.exactly(true);
        should(produto.codigo).is.exactly(dados.codigo);
        should(produto.titulo).is.exactly(dados.titulo);
        should(produto.descricao).is.exactly(dados.descricao);
        should(produto.valor).is.a.Array();
        should(produto.ativo).is.exactly(true);
        should(produto.categoria).is.a.Object();
        should(produto.imagem).is.a.Object();
        should(produto.album).is.a.Array();
        should(produto.cadastro).be.instanceOf(Date);
        should(produto.site).is.exactly(dados.site);
        should(produto.quantidade).is.exactly(dados.quantidade);

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
        should(produto.valor).is.a.Array();
        should(produto.quantidade).is.exactly(0);
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
            imagem      : {
                public_id: 'xxx',
                version: 1,
                signature: 'xx',
                width: 100,
                height: 100,
                format: 'jpeg',
                resource_type: 'foo',
                created_at: (new Date),
                tags: [],
                bytes: 1,
                type: 'image',
                etag: 'foo',
                url: 'foo',
                secure_url: 'foo'
            },
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
        should(produto.valor).is.a.Array();
        should(produto.ativo).is.exactly(true);
        should(produto.categoria).is.a.Object();
        should(produto.imagem).is.a.Object(dados.imagem);
        should(produto.album).is.a.Array();
        should(produto.cadastro).be.instanceOf(Date);
        should(produto.site).is.exactly(dados.site);

        done();
    });

    it('converter para json', function (done) {
        var produto = (new Produto()).toJSON();

        should(produto).have.property('_id');
        should(produto.codigo).is.exactly('');
        should(produto.titulo).is.exactly(undefined);
        should(produto.descricao).is.exactly(undefined);
        should(produto.valor).is.a.Array();
        should(produto.quantidade).is.exactly(0);
        should(produto.categoria).is.exactly(undefined);
        should(produto.imagem).is.exactly(undefined);
        should(produto.album).is.a.Array();
        should(produto.album.length).is.exactly(0);
        should(produto.dimensoes).is.exactly(undefined);
        should(produto.peso).is.exactly(undefined);
        should(produto.cadastro).be.instanceOf(Date);
        should(produto.atualizacao).be.instanceOf(Date);
        should(produto.site).is.exactly(undefined);
        should(produto.ativo).is.exactly(undefined);

        done();
    });
});