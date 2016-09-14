'use strict';

var connection = require('../modules/connection');
var site = require('../controllers/site');
var usuario = require('../controllers/usuario');
var async = require('async');
var bcrypt = require('bcrypt');
var salt = process.env.PASSWORD_SALT || '$2a$10$MeVpoT66x6r2eNFZ8diZDe';
var uniqid = require('uniqid');
var os = require("os");

async.waterfall(
    [
        function (callback) {
            console.log('Criando Site');

            var params = {
                nome: os.hostname(),
                dominio: os.hostname(),
                emails: [],
                enderecos: [],
                telefones: [],
                categorias: [],
                config: {}
            };

            site.adiciona(params, callback);
        },
        function (site, callback) {
            console.log('Criando Usuário');

            var params = {
                nome: 'Administrador',
                email: 'admin@' + os.hostname(),
                password: bcrypt.hashSync(os.hostname(), salt)
            };

            usuario.adiciona(site._id, params, callback);
        }
    ], 
    function (err, done) {
        console.log('Site cadastrado com sucesso.');
        console.log('Suas credenciais são: admin@' + os.hostname() + ' - ' + os.hostname());

        process.exit(0);
    }
);
