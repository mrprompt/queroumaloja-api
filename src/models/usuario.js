'use strict';

var pagination  = require('mongoose-paginate');
var mongoose = require(__dirname + '/index').mongoose;
var Schema = mongoose.Schema;
var UsuarioSchema = new Schema({
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
});

UsuarioSchema.plugin(pagination);

var Usuario = mongoose.model('Usuario', UsuarioSchema);

exports.auth = function(req, res, callback) {
    Usuario.find({
        email: req.params.body.username,
        password: req.params.body.password
    }, function (err, user) {
        if (err || user === null) {
            return callback(null);
        }

        return callback(user._id);
    });
};

exports.findById = function(req, res, callback) {
    Usuario.find({
        _id: req.params.body.id
    }, function (err, user) {
        if (err) {
            return callback(err);
        }

        return user;
    });
};