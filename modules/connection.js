'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var dbUser = process.env.DB_USERNAME  || 'admin';
var dbPass = process.env.DB_PASSWORD  || 'admin';
var dbHost = process.env.DB_HOST      || '127.0.0.1';
var dbPort = process.env.DB_PORT      || '27017';
var dbName = process.env.DB_NAME      || 'admin';

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect(dbUser + ":" + dbPass + "@" + dbHost + ':' + dbPort + '/' + dbName);
}

exports.mongoose = mongoose;
