'use strict';

var dbUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME  || 'admin';
var dbPass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD  || 'admin';
var dbHost = process.env.OPENSHIFT_MONGODB_DB_HOST      || '127.0.0.1';
var dbPort = process.env.OPENSHIFT_MONGODB_DB_PORT      || '27017';
var dbName = process.env.OPENSHIFT_DATABASE_NAME        || 'test';
var dbUri  = dbUser + ":" + dbPass + "@" + dbHost + ':' + dbPort + '/' + dbName;

var mongoose = require('mongoose');
    mongoose.connect(dbUri);

exports.mongoose = mongoose;
