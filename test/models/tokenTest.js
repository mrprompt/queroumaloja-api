'use strict';

var Token = require('../../src/models/token');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var should = require('should');

describe('Token Model', function () {
    it('inicia sem erros', function (done) {
        var token = new Token();

        should(token.isNew).is.exactly(true);

        done();
    });

    it('iniciando sem item e comprador deve retornar os atributos informados como parâmetros', function (done) {
        var dados = {
            cadastro: new Date()
        };

        var token = new Token(dados);
            token.should.have.property('cadastro', dados.cadastro);

        should(token.isNew).is.exactly(true);

        done();
    });
});