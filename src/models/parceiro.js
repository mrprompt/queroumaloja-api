'use strict';

var mongoose        = require(__dirname + '/../modules/connection').mongoose;
var ParceiroSchema  = new mongoose.Schema({
    nome: {
        type: String
    },
    imagem: {
        type: Object
    },
    url: {
        type: String
    },
    atuacao: {
        type: String
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
var ParceiroModel   = mongoose.model('Parceiro', ParceiroSchema);

module.exports = ParceiroModel;
