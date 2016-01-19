/**
 * Site Model
 *
 * @author Thiago Paes
 * @package site
 * @licence GPL V3
 */
'use strict';

var mongoose    = require('mongoose');
var SiteSchema  = new mongoose.Schema({
    nome: {
        type: String
    },
    dominio: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    emails: {
        type: []
    },
    enderecos: {
        type: []
    },
    telefones: {
        type: []
    },
    config: {
        type: []
    }
})
    .plugin(require('mongoose-paginate'))
    .plugin(require('mongoose-unique-validator'))
    .set('toJSON', {
        transform: function(doc, ret, options) {
            delete ret.config;

            return ret;
        }
    });

module.exports = mongoose.model('Site', SiteSchema);
