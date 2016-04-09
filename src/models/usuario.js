'use strict';

var mongoose        = require('mongoose');
var UsuarioSchema   = new mongoose.Schema({
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site',
        required: true
    },
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
        required: true,
        bcrypt: true
    },
    endereco: [
        new mongoose.Schema({
            logradouro: {
                type: String,
                required: true
            },
            complemento: {
                type: String,
                default: ''
            },
            numero: {
                type: Number,
                default:  0
            },
            bairro: {
                type: String,
                required: true
            },
            cep: {
                type: String,
                trim: true
            },
            cidade: {
                type: String,
                required: true
            },
            estado: {
                type: String,
                required: true
            },
            tipo: {
                type: String,
                enum: ['comercial', 'residencial'],
                default: 'residencial'
            }
        })
    ],
    cadastro: {
        type: Date,
        default: Date.now
    }
})
    .plugin(require('mongoose-paginate'))
    .plugin(require('mongoose-unique-validator'))
    .set('toJSON', {
        transform: function(doc, ret, options) {
            delete ret.password;
            delete ret.site;

            return ret;
        }
    });

module.exports = mongoose.model('Usuario', UsuarioSchema);
