'use strict';

var mongoose        = require(__dirname + '/../modules/connection').mongoose;
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
})
    .plugin(require('mongoose-paginate'))
    .plugin(require('mongoose-unique-validator'))
    .plugin(require('mongoose-bcrypt'))
    .set('toJSON', {
        transform: function(doc, ret, options) {
            delete ret.password;

            return ret;
        }
    });

module.exports = mongoose.model('Usuario', UsuarioSchema);
