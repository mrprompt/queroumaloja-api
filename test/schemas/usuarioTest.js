'use strict';

var Usuario = require('../../schemas/usuario');
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

    it('converter para json', function (done) {
        var produto = (new Usuario()).toJSON();

        produto.should.have.property('_id');

        should(produto.password).is.exactly(undefined);
        should(produto.site).is.exactly(undefined);

        done();
    });
});