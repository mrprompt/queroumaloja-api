'use strict';

var mongoose        = require('mongoose');
var CarrinhoSchema  = new mongoose.Schema({
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    },
    items: [
        new mongoose.Schema({
            produto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Produto'
            },
            quantidade: {
                type: Number,
                default: 1,
                min: 1
            },
            cadastro: {
                type: Date,
                default: Date.now
            }
        })
    ],
    comprador: {
        nome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        telefone: {
            type: String,
            required: true
        },
        endereco: {
            logradouro: {
                type: String,
                required: true
            },
            numero: {
                type: String,
                required: true
            },
            complemento: {
                type: String,
                required: false
            },
            bairro: {
                type: String,
                required: true
            },
            cep: {
                type: Number,
                required: true
            }
        },
        localidade: {
            cidade: {
                type: String
            },
            estado: {
                type: String
            },
            uf: {
                type: String
            }
        }
    },
    valor: {
        type: Number,
        required: true,
        min: 1
    },
    token: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        lowercase: true,
        trim: true,
        enum: ['processando', 'autorizada', 'paga', 'estornada', 'aguardando', 'estornando', 'recusada'],
        default: 'aguardando'
    },
    cadastro: {
        type: Date,
        default: Date.now
    }
})
.plugin(require('mongoose-paginate'));

module.exports = mongoose.model('Carrinho', CarrinhoSchema);
