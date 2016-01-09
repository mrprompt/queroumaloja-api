'use strict';

var Orcamento = require('../../src/models/orcamento');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var should = require('should');

describe('Orcamento Model', function () {
    it('inicia sem erros', function (done) {
        var orcamento = new Orcamento();

        should(orcamento.isNew).is.exactly(true);

        done();
    });

    it('iniciando sem item e comprador deve retornar os atributos informados como parâmetros', function (done) {
        var dados = {
            cadastro: new Date(),
            site    : new ObjectId()
        };

        var orcamento = new Orcamento(dados);
            orcamento.should.have.property('cadastro', dados.cadastro);
            orcamento.should.have.property('site', dados.site);

        should(orcamento.isNew).is.exactly(true);

        done();
    });
});