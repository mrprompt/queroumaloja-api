const siteController = require('../controllers/site');
const usuarioController = require('../controllers/usuario');
const async = require('async');
const bcrypt = require('bcryptjs');
const os = require('os');

const salt = process.env.PASSWORD_SALT || '$2a$10$MeVpoT66x6r2eNFZ8diZDe';
const host = process.env.HEROKU_APP_NAME || os.hostname();

async.waterfall(
  [
    function (callback) {
      console.log('Criando Site');

      const params = {
        nome: host,
        dominio: host,
        emails: [],
        enderecos: [],
        telefones: [],
        categorias: [],
        config: {}
      };

      siteController.adiciona(params, callback);
    },
    function (site, callback) {
      console.log('Criando Usuário');

      const params = {
        nome: 'Administrador',
        email: `admin@${os.hostname()}`,
        password: bcrypt.hashSync(os.hostname(), salt)
      };

      usuarioController.adiciona(site._id, params, callback);
    }
  ],
    (err, done) => {
      console.log('Site cadastrado com sucesso.');
      console.log(`Suas credenciais são: admin@${os.hostname()} - ${os.hostname()}`);

      process.exit(0);
    }
);
