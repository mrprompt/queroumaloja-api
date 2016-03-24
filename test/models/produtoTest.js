'use strict';

var Produto = require('../../src/models/produto');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var should = require('should');

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

    it('iniciando sem item e comprador deve retornar os atributos informados como parâmetros', function (done) {
        var dados = {
            cadastro: new Date(),
            site    : new ObjectId()
        };

        var produto = new Produto(dados);
            produto.should.have.property('cadastro', dados.cadastro);
            produto.should.have.property('site', dados.site);

        should(produto.isNew).is.exactly(true);

        done();
    });
});