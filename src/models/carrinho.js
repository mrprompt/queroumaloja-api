/**
 * Carrinho model
 *
 * @author Thiago Paes
 * @package carrinho
 * @licence GPL V3
 */
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
        type: Object,
        required: false
    },
    valor: {
        type: Number,
        min: 1
    },
    token: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        lowercase: true,
        trim: true,
        enum: ['processando', 'autorizado', 'pago', 'estornado', 'aguardando', 'estornando', 'recusado'],
        default: 'processando'
    },
    cadastro: {
        type: Date,
        default: Date.now
    }
})
    .plugin(require('mongoose-paginate'))
    .set('toJSON', {
        transform: function(doc, ret, options) {
            delete ret.site;

            return ret;
        }
    });

module.exports = mongoose.model('Carrinho', CarrinhoSchema);
