'use strict';

var mongoose = require('mongoose');

var connection_string = 'mongodb://localhost/empresas';

// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
                        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
                        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
                        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
                        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connection_string);

var connection = mongoose.connection;

connection.on('error', function(err) {
    console.info('Erro durante a conexão com o banco de dados');
});

connection.on('connected', function(str) {
    console.info('Conectado em: ' + connection_string);
});

exports.mongoose = mongoose;
exports.db = db;