/**
 * Produto Model
 *
 * @author Thiago Paes
 * @package produto
 * @licence GPL V3
 */
'use strict';

var mongoose        = require('mongoose');
var ProdutoSchema   = new mongoose.Schema({
    codigo: {
        type: String,
        default: ''
    },
    titulo: {
        type: String
    },
    descricao: {
        type: String
    },
    valor: {
        type: Number,
        default: 0.00
    },
    categoria: {
        type: Object
    },
    ativo: {
        type: Boolean,
        default: true
    },
    imagem: {
        type: Object
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
})
    .plugin(require('mongoose-paginate'))
    .set('toJSON', {
        transform: function(doc, ret, options) {
            delete ret.site;
            delete ret.ativo;

            return ret;
        }
    })
    .index({ titulo: 'text', descricao: 'text' });

module.exports = mongoose.model('Produto', ProdutoSchema);
