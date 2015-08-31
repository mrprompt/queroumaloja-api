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
    }
}).plugin(require('mongoose-paginate'));
var CarrinhoModel   = mongoose.model('Carrinho', CarrinhoSchema);

module.exports = CarrinhoModel;
