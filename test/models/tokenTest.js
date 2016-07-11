'use strict';

var Token = require('../../models/token');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var should = require('should');

describe('Token Model', function () {
    it('inicia sem erros', function (done) {
        var token = new Token();
            token.should.have.property('isNew', true);
            token.should.have.property('errors', undefined);

        done();
    });

    it('iniciando item deve retornar os atributos informados como parâmetros', function (done) {
        var validade = new Date();
            validade.setDate(validade.getDate() + 7);

        var dados = {
            cadastro: new Date(),
            validade: validade,
            conteudo: 'fooo',
            usuario: new ObjectId()
        };

        var token = new Token(dados);
            token.should.have.property('cadastro', dados.cadastro);
            token.should.have.property('validade', dados.validade);
            token.should.have.property('conteudo', dados.conteudo);
            token.should.have.property('usuario', dados.usuario);
            token.should.have.property('isNew', true);
            token.should.have.property('errors', undefined);

        done();
    });
});