'use strict';

var mongoose        = require(__dirname + '/../modules/connection').mongoose;
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
