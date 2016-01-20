/**
 * Slide Model
 *
 * @author Thiago Paes
 * @package slide
 * @licence GPL V3
 */
'use strict';

var mongoose    = require('mongoose');
var SlideSchema = new mongoose.Schema({
    titulo: {
        type: String,
        default: ''
    },
    descricao: {
        type: String,
        default: ''
    },
    endereco: {
        type: String,
        default: ''
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

            return ret;
        }
    });

module.exports = mongoose.model('Slide', SlideSchema);
