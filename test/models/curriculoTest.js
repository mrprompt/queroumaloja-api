'use strict';

var Curriculo = require('../../src/models/curriculo');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var should = require('should');

describe('Curriculo Model', function () {
    it('inicia sem erros', function (done) {
        var curriculo = new Curriculo();

        should(curriculo.isNew).is.exactly(true);

        done();
    });

    it('iniciando sem item e comprador deve retornar os atributos informados como parâmetros', function (done) {
        var dados = {
            cadastro: new Date(),
            site    : new ObjectId()
        };

        var curriculo = new Curriculo(dados);
            curriculo.should.have.property('cadastro', dados.cadastro);
            curriculo.should.have.property('site', dados.site);

        should(curriculo.isNew).is.exactly(true);

        done();
    });
});