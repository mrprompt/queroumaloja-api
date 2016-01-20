/**
 * Aviso Model
 *
 * @author Thiago Paes
 * @package aviso
 * @licence GPL V3
 */
'use strict';

var mongoose    = require('mongoose');
var AvisoSchema = new mongoose.Schema({
    titulo: {
        type: String
    },
    conteudo: {
        type: String
    },
    tipo: {
        type: String,
        default: 'info'
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    inicio: {
        type: Date,
        default: Date.now
    },
    fim: {
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

            return ret;
        }
    });

module.exports = mongoose.model('Aviso', AvisoSchema);