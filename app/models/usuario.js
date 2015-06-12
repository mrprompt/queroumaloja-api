'use strict';

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

var Usuario = mongoose.model('Usuario', UsuarioSchema);

exports.Usuario = Usuario;