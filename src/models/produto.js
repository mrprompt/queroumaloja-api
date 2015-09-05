'use strict';

var mongoose        = require(__dirname + '/../modules/connection').mongoose;
var ProdutoSchema   = new mongoose.Schema({
    codigo: {
        type: String,
        default: ''
    },
    titulo: {
        type: String
    },
    descricao: {
        type: String
    },
    tipo: {
        type: String,
        default: ''
    },
    valor: {
        type: Number,
        default: 0.00
    },
    categoria: {
        type: String,
        default: ''
    },
    ativo: {
        type: Boolean,
        default: true
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
    .plugin(require('mongoose-text-search'))
    .index({ descricao: 'text' });

var ProdutoModel    = mongoose.model('Produto', ProdutoSchema);

module.exports = ProdutoModel;
