/**
 * Equipe Model
 *
 * @author Thiago Paes
 * @package equipe
 * @licence GPL V3
 */
'use strict';

var mongoose        = require('mongoose');
var EquipeSchema    = new mongoose.Schema({
    nome: {
        type: String
    },
    cargo: {
        type: String
    },
    email: {
        type: String
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
    .plugin(require('mongoose-paginate'));

module.exports = mongoose.model('Equipe', EquipeSchema);
