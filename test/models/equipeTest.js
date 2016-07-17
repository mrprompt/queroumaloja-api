'use strict';

var Equipe = require('../../models/equipe');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var should = require('should');

describe('Equipe Model', function () {
    it('inicia sem erros', function (done) {
        var equipe = new Equipe();

        should(equipe.isNew).is.exactly(true);

        done();
    });

    it('iniciando sem item e comprador deve retornar os atributos informados como parâmetros', function (done) {
        var dados = {
            cadastro: new Date(),
            site    : new ObjectId()
        };

        var equipe = new Equipe(dados);
            equipe.should.have.property('cadastro', dados.cadastro);
            equipe.should.have.property('site', dados.site);

        should(equipe.isNew).is.exactly(true);

        done();
    });
});