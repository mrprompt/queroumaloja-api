'use strict';

var mongoose = require('mongoose');
var should = require('should');
var mockery = require('mockery');

describe('Imagem Controller', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../models/imagem', {
            adicionaImagem: function(produto, site, params, done) {
                done(null, {
                    _id: new mongoose.Types.ObjectId()
                });
            },
            apagaImagem: function(id, site, imagem, done) {
                done(null, {
                    _id: new mongoose.Types.ObjectId()
                });
            },
        });

        this.controller = require('../../controllers/imagem');
    });

    after(function() {
        mockery.disable()
    });

    it('adicionar deve retornar um objeto e status de sucesso.', function (done) {
        var request  = {
            titulo: 'foo',
            descricao: 'bar bar bar',
            imagem: {},
            codigo: 0,
            valor: 1.00,
            categoria: {
                titulo: 'foo',
                uri: 'foo',
                categoria: {
                    titulo: 'bar',
                    uri: 'bar'
                }
            }
        };

        this.controller.adiciona(mongoose.Types.ObjectId(), mongoose.Types.ObjectId(), {}, function(err, result) {
            should(err).not.be.ok();
            should(result).is.be.ok();

            result.should.have.property('_id');

            done();
        });

    });

    it('apaga deve retornar o objeto e status de sucesso.', function (done) {
        this.controller.apaga(mongoose.Types.ObjectId(), mongoose.Types.ObjectId(), mongoose.Types.ObjectId(), function(err, result) {
            should(err).not.be.ok();
            should(result).is.be.ok();

            result.should.have.property('_id');

            done();
        });
    });
});
