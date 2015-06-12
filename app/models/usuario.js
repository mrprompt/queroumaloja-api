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

exports.Usuario = Usuario;