'use strict';

var async = require('async');
var UsuarioModel = require('../models/usuario'),
    TokenModel = require('../models/token'),
    LoginController = function() {};

/**
 * Efetua um login e adquire um token de acesso
 *
 * @param req
 * @param res
 * @param done
 */
LoginController.prototype.adiciona = function (email, password, site, done) {
  async.waterfall([
        function (callback) {
            UsuarioModel.login(email, password, site, function (err, user) {
                if (err || !user) {
                    return done(new Error('Usuário/Senha inválidos'));
                }

                callback(null, user);
            });
        },
        function (user, callback) {
            TokenModel.adiciona(user, function (errorToken, dataToken) {
                callback(errorToken, dataToken);
            });
        }
    ], function(err, results) {
        done(err, results);
    });
};

module.exports = new LoginController;
