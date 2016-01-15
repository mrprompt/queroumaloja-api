'use strict';

var mongoose    = require('mongoose');
var SiteSchema  = new mongoose.Schema({
    nome: {
        type: String
    },
    dominio: {
        type: String
    },
    descricao: {
        type: String
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
    modules: {
        type: []
    }
})
    .plugin(require('mongoose-paginate'))
    .set('toJSON', {
        transform: function(doc, ret, options) {
            delete ret.config;
            delete ret.modules;

            return ret;
        }
    });

module.exports = mongoose.model('Site', SiteSchema);
