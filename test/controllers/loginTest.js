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

        mockery.registerMock('../models/usuario', {
            login: function(email, password, site, done) {
                if (email == 'foo@bar.bar' || password == '$2a$10$MeVpoT66x6r2eNFZ8diZDxDvj2vSjq/Hn6AUIHCKiV7mbU8dBR2OW') {
                    done(null, {
                        _id: new mongoose.Types.ObjectId()
                    });
                } else {
                    done(new Error('Nada encontrado'), null);
                }
            }
        });

        mockery.registerMock('../models/token', {
            adiciona: function(usuario, done) {
                done(null, {
                    _id: new mongoose.Types.ObjectId()
                });
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
        var site = mongoose.Types.ObjectId();

        this.controller.adiciona(email, password, site, function(error, result) {
            should(error).is.be.null();
            should(result).is.be.ok();

            done();
        });
    });

    it('usuário inválido deve retornar um objeto Error', function (done) {
        var email = 'foo@bars.bar';
        var password = '$2a$10$MeVpoT66x6r2eNFZ8diZDeBvj2vSjq/Hn6AUIHCKiV7mbU8dBR2OW';
        var site = mongoose.Types.ObjectId();

        this.controller.adiciona(email, password, site, function(error, result) {
            error.should.be.an.instanceOf(Error).and.have.property('message');

            done();
        });
    });
});
