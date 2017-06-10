const TokenSchema = require('../schemas/token');
const TokenAdapter = require('token');

const TokenModel = function () {
};

/**
 * Adiciona um token para o usuário
 */
TokenModel.prototype.adiciona = (user, done) => {
  TokenAdapter.defaults.secret = 'AAB';
  TokenAdapter.defaults.timeStep = (24 * 60 * 60);

  // validade do token é de uma semana
  const validade = new Date();
  validade.setDate(validade.getDate() + 7);

  // Gerando conteúdo do token
  const content = TokenAdapter.generate(`${user._id}|${user.email}`);

  TokenSchema.create({
    usuario: user,
    cadastro: (new Date()),
    validade,
    conteudo: content
  }, (errCreate, resultCreate) => {
    done(errCreate, resultCreate);
  });
};

TokenModel.prototype.buscaPorConteudo = (conteudo, site, done) => {
  TokenSchema.findOne(
    {
      conteudo,
      validade: {
        $lt: new Date()
      },
      site
    }
  )
    .populate(['usuario'])
    .exec(done);
};

module.exports = new TokenModel();
