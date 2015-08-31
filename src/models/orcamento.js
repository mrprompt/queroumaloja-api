'use strict';

var mongoose        = require(__dirname + '/../modules/connection').mongoose;
var OrcamentoSchema = new mongoose.Schema({
    solicitante: {
        type: String,
        default: ''
    },
    empresa: {
        type: String,
        default: ''
    },
    documento: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    telefone: {
        type: String,
        default: ''
    },
    celular: {
        type: String,
        default: ''
    },
    servico: {
        type: String,
        default: ''
    },
    endereco: {
        type: String,
        default: ''
    },
    bairro: {
        type: String,
        default: ''
    },
    cep: {
        type: String,
        default: ''
    },
    cidade: {
        type: String,
        default: ''
    },
    estado: {
        type: String,
        default: ''
    },
    detalhes: {
        type: String,
        default: ''
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
}).plugin(require('mongoose-paginate'));
var OrcamentoModel  = mongoose.model('Orcamento', OrcamentoSchema);

module.exports = OrcamentoModel;
