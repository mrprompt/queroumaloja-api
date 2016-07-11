'use strict';

var Aviso = require('../../models/aviso');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var should = require('should');

describe('Aviso Model', function () {
    it('inicia sem erros', function (done) {
        var aviso = new Aviso();

        should(aviso.isNew).is.exactly(true);

        done();
    });

    it('deve retornar os atributos informados como parâmetros', function (done) {
        var dados = {
            titulo  : 'teste',
            conteudo: 'teste',
            tipo    : 'teste',
            cadastro: new Date(),
            inicio  : new Date(),
            fim     : new Date(),
            site    : new ObjectId()
        };

        var aviso = new Aviso(dados);
            aviso.should.have.property('titulo', dados.titulo);
            aviso.should.have.property('conteudo', dados.conteudo);
            aviso.should.have.property('tipo', dados.tipo);
            aviso.should.have.property('cadastro', dados.cadastro);
            aviso.should.have.property('inicio', dados.inicio);
            aviso.should.have.property('fim', dados.fim);
            aviso.should.have.property('site', dados.site);

        should(aviso.isNew).is.exactly(true);

        done();
    });
});