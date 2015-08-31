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
    },
    modulos: {
        type: []
    },
    atuacao: {
        type: []
    },
    servicos: {
        type: []
    }
});
var SiteModel   = mongoose.model('Site', SiteSchema);

module.exports = SiteModel;
