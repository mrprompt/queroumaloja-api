'use strict';

var mongoose        = require(__dirname + '/../modules/connection').mongoose;
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
}).plugin(require('mongoose-paginate'));
var EquipeModel = mongoose.model('Equipe', EquipeSchema);

module.exports  = EquipeModel;
