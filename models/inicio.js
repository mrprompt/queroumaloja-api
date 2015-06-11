'use strict';

var connection = require('./index');
var site = require('./site');
var mongoose = connection.mongoose;

exports.list = function(req, res) {
    res.json([]);
};
