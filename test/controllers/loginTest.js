'use strict';

var mongoose = require('mongoose');
var should = require('should');
var mockery = require('mockery');

describe('Login Controller', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        mockery.registerMock('../dao/usuario', {
            login: function(email, password, site, done) {
                if (email == 'foo@bar.bar' || password == '$2a$10$MeVpoT66x6r2eNFZ8diZDxDvj2vSjq/Hn6AUIHCKiV7mbU8dBR2OW') {
                    done(null, {
                        _id: new mongoose.Schema.Types.ObjectId()
                    });
                } else {
                    done(new Error('Nada encontrado'), null);
                }
            }
        });

        mockery.registerMock('../dao/token', {
            adiciona: function(usuario, done) {
                if (usuario) {
                    done(null, {
                        _id: new mongoose.Schema.Types.ObjectId()
                    });
                } else {
                    done(new Error('Nada encontrado'), null);
                }
            }
        });

        this.controller = require('../../controllers/login');
    });

    after(function() {
        mockery.disable()
    });

    it('usuário válido deve retornar um objeto e status de sucesso', function (done) {
        var email = 'foo@bar.bar';
        var password = '$2a$10$MeVpoT66x6r2eNFZ8diZDxDvj2vSjq/Hn6AUIHCKiV7mbU8dBR2OW';
        var site = mongoose.Schema.Types.ObjectId();

        this.controller.adiciona(email, password, site, function(error, result) {
            should(error).is.be.null();
            should(result).is.be.ok();

            done();
        });
    });

    it('usuário inválido deve retornar um objeto Error', function (done) {
        var email = 'foo@bars.bar';
        var password = '$2a$10$MeVpoT66x6r2eNFZ8diZDeBvj2vSjq/Hn6AUIHCKiV7mbU8dBR2OW';
        var site = mongoose.Schema.Types.ObjectId();

        this.controller.adiciona(email, password, site, function(error, result) {
            error.should.be.an.instanceOf(Error).and.have.property('message');

            done();
        });
    });
});
