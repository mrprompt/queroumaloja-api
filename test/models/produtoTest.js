'use strict';

var Produto = require('../../src/models/produto');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var should = require('should');

describe('Produto Model', function () {
    it('inicia sem erros', function (done) {
        var produto = new Produto();

        should(produto.isNew).is.exactly(true);

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