/**
 * Emprego Model
 *
 * @author Thiago Paes
 * @package emprego
 * @licence GPL V3
 */
'use strict';

var mongoose        = require('mongoose');
var EmpregoSchema   = new mongoose.Schema({
    titulo: {
        type: String,
        default: ''
    },
    descricao: {
        type: String,
        default: ''
    },
    tags: {
        type: [],
        default: ''
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    salario: {
        type: String,
        default: ''
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
})
    .plugin(require('mongoose-paginate'));

module.exports = mongoose.model('Emprego', EmpregoSchema);
