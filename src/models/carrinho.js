'use strict';

var mongoose        = require(__dirname + '/../modules/connection').mongoose;
var CarrinhoSchema  = new mongoose.Schema({
    titulo: {
        type: String
    },
    items: [
        new mongoose.Schema({
            produto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Produto'
            },
            quantidade: {
                type: Number,
                default: 1
            },
            cadastro: {
                type: Date,
                default: Date.now
            }
        })
    ],
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    },
    status: {
        type: String,
        enum: ['novo', 'pago', 'apagado', 'estornado']
    },
    token: {
        type: String,
        default: ''
    }
})
    .plugin(require('mongoose-paginate'));

module.exports = mongoose.model('Carrinho', CarrinhoSchema);
