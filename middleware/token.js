const _ = require('underscore');
const TokenDAO = require('../models/token');
const routes = require('../config/firewall.json');

const router = (req, res, done) => {
  if (req.method === 'OPTIONS' || !_.contains(routes, `${req.baseUrl}|${req.method}`)) {
    done();

    return true;
  }

  if (!req.headers.authorization) {
    done(new Error('Atributo authorization não encontrado no cabeçalho'));

    return false;
  }

  TokenDAO.buscaPorConteudo(req.headers.authorization, req.app.site._id, (err, data) => {
    if (err || !data) {
      done(new Error('Token não autorizado'));

      return;
    }

    req.app.usuario = data.usuario;

    done(err, data);
  });
};

module.exports = router;
