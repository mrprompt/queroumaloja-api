'use strict';

var mongoose        = require(__dirname + '/../modules/connection').mongoose;
var UsuarioSchema   = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
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
