'use strict';

var mongoose    = require(__dirname + '/../modules/connection').mongoose;
var SlideSchema = new mongoose.Schema({
    titulo: {
        type: String,
        default: ''
    },
    descricao: {
        type: String,
        default: ''
    },
    endereco: {
        type: String,
        default: ''
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
var SlideModel  = mongoose.model('Slide', SlideSchema);

module.exports = SlideModel;
