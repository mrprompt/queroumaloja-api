'use strict';

var dbUser = process.env.DB_USERNAME  || 'admin';
var dbPass = process.env.DB_PASSWORD  || 'admin';
var dbHost = process.env.DB_HOST      || '127.0.0.1';
var dbPort = process.env.DB_PORT      || '27017';
var dbName = process.env.DB_NAME      || 'admin';
var dbUri  = dbUser + ":" + dbPass + "@" + dbHost + ':' + dbPort + '/' + dbName;

if (process.ENV.MONGODB_URI) {
    dbUri = process.ENV.MONGODB_URI
}

var mongoose = require('mongoose');
    mongoose.connect(dbUri);
    mongoose.Promise = global.Promise;

exports.mongoose = mongoose;
