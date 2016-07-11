'use strict';

var Carrinho = require('../../models/carrinho');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var should = require('should');

describe('Carrinho Model', function () {
    it('inicia sem erros', function (done) {
        var carrinho = new Carrinho();

        should(carrinho.isNew).is.exactly(true);

        done();
    });

    it('iniciando sem item e comprador deve retornar os atributos informados como parâmetros', function (done) {
        var dados = {
            cadastro: new Date(),
            site    : new ObjectId(),
            valor   : 0,
            token   : '',
            status  : 'novo'
        };

        var carrinho = new Carrinho(dados);
            carrinho.should.have.property('cadastro', dados.cadastro);
            carrinho.should.have.property('site', dados.site);
            carrinho.should.have.property('valor', dados.valor);
            carrinho.should.have.property('token', dados.token);
            carrinho.should.have.property('status', dados.status);

        should(carrinho.isNew).is.exactly(true);

        done();
    });
});