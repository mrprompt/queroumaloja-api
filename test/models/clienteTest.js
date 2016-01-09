'use strict';

var Cliente = require('../../src/models/cliente');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var should = require('should');

describe('Cliente Model', function () {
    it('inicia sem parâmetros deve executar sem erros', function (done) {
        var cliente = new Cliente();

        should(cliente.isNew).is.exactly(true);

        done();
    });

    it('iniciando com parâmetros deve retornar parâmetros informados como os atributos', function (done) {
        var dados = {
            cadastro: new Date(),
            site    : new ObjectId()
        };

        var cliente = new Cliente(dados);
            cliente.should.have.property('cadastro', dados.cadastro);
            cliente.should.have.property('site', dados.site);

        should(cliente.isNew).is.exactly(true);

        done();
    });
});