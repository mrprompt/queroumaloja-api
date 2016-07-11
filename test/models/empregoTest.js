'use strict';

var Emprego = require('../../models/emprego');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var should = require('should');

describe('Emprego Model', function () {
    it('inicia sem erros', function (done) {
        var emprego = new Emprego();

        should(emprego.isNew).is.exactly(true);

        done();
    });

    it('iniciando sem item e comprador deve retornar os atributos informados como parâmetros', function (done) {
        var dados = {
            cadastro: new Date(),
            site    : new ObjectId()
        };

        var emprego = new Emprego(dados);
            emprego.should.have.property('cadastro', dados.cadastro);
            emprego.should.have.property('site', dados.site);

        should(emprego.isNew).is.exactly(true);

        done();
    });
});