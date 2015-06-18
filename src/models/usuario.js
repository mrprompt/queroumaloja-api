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
    Usuario.findOne({
        email: req.body.username,
        password: req.body.password
    }, function (err, user) {
        if (err || user === null) {
            return res.sendStatus(403);
        }

        return callback(null, user);
    })
        .populate('site');
};

exports.get = function (req, res, callback) {
    Usuario.findOne({
        _id: req.params.id
    }, function (err, user) {
        if (err || user === null) {
            return res.sendStatus(404);
        }

        return callback(null, user);
    })
        .populate('site');
};