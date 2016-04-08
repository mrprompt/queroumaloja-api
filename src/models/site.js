'use strict';

var mongoose    = require('mongoose');
var SiteSchema  = new mongoose.Schema({
    nome: {
        type: String,
        required: true
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
    },
    ativo: {
        type: Boolean,
        default: false
    }
})
    .plugin(require('mongoose-paginate'))
    .plugin(require('mongoose-unique-validator'))
    .set('toJSON', {
        transform: function(doc, ret, options) {
            delete ret.config;
            delete ret.ativo;

            return ret;
        }
    });

module.exports = mongoose.model('Site', SiteSchema);
