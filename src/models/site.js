'use strict';

var mongoose    = require(__dirname + '/../modules/connection').mongoose;
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
    }
})
    .plugin(require('mongoose-paginate'));

module.exports = mongoose.model('Site', SiteSchema);
