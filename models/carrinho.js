'use strict';

var mongoose        = require('mongoose');
var CarrinhoSchema  = new mongoose.Schema({
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site',
        required: true
    },
    comprador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
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
    valor: {
        type: Number,
        min: 1
    },
    token: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    status: {
        type: String,
        lowercase: true,
        trim: true,
        enum: ['processando', 'autorizado', 'pago', 'estornado', 'aguardando', 'estornando', 'recusado'],
        default: 'processando'
    },
    tipo: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        enum: ['local', 'pagarme', 'pagseguro'],
        default: 'local'
    },
    entrega: mongoose.Schema({
        modalidade: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            enum: ['pac', 'sedex', 'transportadora', 'moto', 'proprio', 'outro', 'nenhuma']
        },
        valor: {
            type: Number,
            default: 0.00
        }
    }),
    cadastro: {
        type: Date,
        default: Date.now
    }
})
    .plugin(require('mongoose-paginate'))
    .plugin(require('mongoose-unique-validator'))
    .set('toJSON', {
        transform: function(doc, ret, options) {
            delete ret.site;

            return ret;
        }
    });

module.exports = mongoose.model('Carrinho', CarrinhoSchema);
