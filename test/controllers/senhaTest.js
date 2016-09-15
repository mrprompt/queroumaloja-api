'use strict';

var mongoose = require('mongoose');
var should = require('should');
var mockery = require('mockery');

describe('Senha Controller', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../dao/usuario', {
            atualizaSenha: function(id, site, password, done) {
                if (password == '1234567890') {
                    done(null, {
                        _id: new mongoose.Schema.Types.ObjectId()
                    });
                } else {
                    done(new Error('Nada encontrado'), null);
                }
            }
        });

        this.controller = require('../../controllers/senha');
    });

    after(function() {
        mockery.disable()
    });

    it('atualizar senha deve retornar nulo', function (done) {
        var site = mongoose.Schema.Types.ObjectId();
        var id = mongoose.Schema.Types.ObjectId();
        var senha = 1234567890;

        this.controller.atualiza(id, site, senha, function(error, data) {
            should(error).is.be.null();
            should(data).is.be.ok();

            done();
        });
    });

    it('atualizar senha sem campo senha deve retornar um objeto Error', function (done) {
        var site = mongoose.Schema.Types.ObjectId();
        var id = mongoose.Schema.Types.ObjectId();
        var senha = null;

        this.controller.atualiza(id, site, senha, function(error, data) {
            error.should.be.an.instanceOf(Error).and.have.property('message');

            done();
        });
    });
});
