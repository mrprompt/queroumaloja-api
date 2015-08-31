'use strict';

var mongoose    = require(__dirname + '/../modules/connection').mongoose;
var TokenSchema = new mongoose.Schema({
    conteudo: {
        type: String,
        default: ''
    },
    tipo: {
        type: String,
        enum: ['rw', 'ro']
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}).plugin(require('mongoose-paginate'));
var TokenModel  = mongoose.model('Token', TokenSchema);

module.exports = TokenModel;