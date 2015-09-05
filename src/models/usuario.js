'use strict';

var mongoose        = require(__dirname + '/../modules/connection').mongoose;
var uniqueValidator = require('mongoose-unique-validator');
var UsuarioSchema   = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    },
    localidade: {
        estado: {
            type: String
        },
        cidade: {
            type: String
        }
    }
}).plugin(uniqueValidator).plugin(require('mongoose-bcrypt'));
var UsuarioModel    = mongoose.model('Usuario', UsuarioSchema);

module.exports = UsuarioModel;
