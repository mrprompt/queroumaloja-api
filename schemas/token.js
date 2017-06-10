const mongoose = require('mongoose');
const TokenSchema = new mongoose.Schema({
  conteudo: {
    type: String
  },
  cadastro: {
    type: Date,
    default: Date.now
  },
  validade: {
    type: Date,
    default: Date.now
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }
})
    .plugin(require('mongoose-paginate'));

module.exports = mongoose.model('Token', TokenSchema);
