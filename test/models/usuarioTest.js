'use strict';

var Usuario = require('../../models/usuario');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var should = require('should');

describe('Usuario Model', function () {
    it('inicia sem erros', function (done) {
        var usuario = new Usuario();

        should(usuario.isNew).is.exactly(true);

        done();
    });

    it('iniciando sem item e comprador deve retornar os atributos informados como parâmetros', function (done) {
        var dados = {
            cadastro: new Date()
        };

        var usuario = new Usuario(dados);
            usuario.should.have.property('cadastro', dados.cadastro);

        should(usuario.isNew).is.exactly(true);

        done();
    });
});