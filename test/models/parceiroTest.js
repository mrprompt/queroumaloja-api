'use strict';

var Parceiro = require('../../src/models/parceiro');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var should = require('should');

describe('Parceiro Model', function () {
    it('inicia sem erros', function (done) {
        var parceiro = new Parceiro();

        should(parceiro.isNew).is.exactly(true);

        done();
    });

    it('iniciando sem item e comprador deve retornar os atributos informados como parâmetros', function (done) {
        var dados = {
            cadastro: new Date(),
            site    : new ObjectId()
        };

        var parceiro = new Parceiro(dados);
            parceiro.should.have.property('cadastro', dados.cadastro);
            parceiro.should.have.property('site', dados.site);

        should(parceiro.isNew).is.exactly(true);

        done();
    });
});