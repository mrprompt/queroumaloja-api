'use strict';

process.env.OPENSHIFT_APP_NAME = 'grupo';
process.env.OPENSHIFT_MONGODB_DB_HOST = 'ds039185.mongolab.com';
process.env.OPENSHIFT_MONGODB_DB_PORT = '39185';
process.env.OPENSHIFT_MONGODB_DB_USERNAME = 'admin';
process.env.OPENSHIFT_MONGODB_DB_PASSWORD = 'q25er9zBvGun';

var connection_string =
    process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;

var mongoose = require('mongoose');
    mongoose.connect(connection_string);

exports.mongoose = mongoose;

console.log(connection_string);