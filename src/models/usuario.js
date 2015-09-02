'use strict';

var mongoose        = require(__dirname + '/../modules/connection').mongoose;
var UsuarioSchema   = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: { unique: true }
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
    }
});
var UsuarioModel    = mongoose.model('Usuario', UsuarioSchema);

module.exports = UsuarioModel;
