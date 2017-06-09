const async = require('async');
const UsuarioModel = require('../models/usuario');
const TokenModel = require('../models/token');

const LoginController = function() {};

/**
 * Efetua um login e adquire um token de acesso
 */
LoginController.prototype.adiciona = (email, password, site, done) => {
  async.waterfall([
    function (callback) {
      UsuarioModel.login(email, password, site, (err, user) => {
        if (err || !user) {
          return done(new Error('Usuário/Senha inválidos'));
        }

        return callback(null, user);
      });
    },
    function (user, callback) {
      TokenModel.adiciona(user, (errorToken, dataToken) => {
        callback(errorToken, dataToken);
      });
    }
  ], (err, results) => {
    done(err, results);
  });
};

module.exports = new LoginController();
