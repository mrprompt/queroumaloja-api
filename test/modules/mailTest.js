'use strict';

var should = require('should'),
    mockery = require('mockery');

describe('Mail Module', function () {
    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            warnOnReplace: false
        });

        this.module = require('../../modules/mail');
    });

    after(function() {
        mockery.disable()
    });

    it('#avisoDeCompra() sem configuração deve retornar sem fazer nada', function (done) {
        var carrinho = {
          site: {
            config: {}
          }
        };

        this.module.avisoDeCompra(carrinho, function(err, result) {
          should.equal(err, null);
          should.equal(result, undefined);
        });

        done();
    });

    it('#avisoDeCompra() com carrinho com status diferente de pago não faz nada', function (done) {
        var carrinho = {
          site: {
            config: {
              sendgrid: {
                token: 'foo',
                template: {
                  carrinho_adiciona: 'foo'
                }
              }
            }
          }
        };

        this.module.avisoDeCompra(carrinho, function(err, result) {
          should.equal(err, null);
          should.equal(result, undefined);
        });

        done();
    });

    it('#avisoDeCompra() com carrinho com status pago deve enviar email', function (done) {
        var carrinho = {
          site: {
            config: {
              sendgrid: {
                token: 'foo',
                template: {
                  carrinho_adiciona: 'foo'
                }
              }
            },
            emails: [
              {
                endereco: 'foo@bar.bar'
              }
            ]
          },
          status: 'pago',
          comprador: {
            email: 'foo@bar.bar.bar',
          },
          items: []
        };

        this.module.avisoDeCompra(carrinho, function(err, result) {
          should.equal(err, null);
          should.equal(result, undefined);
        });

        done();
    });
});
