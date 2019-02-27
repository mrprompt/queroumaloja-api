const _ = require('underscore');
const mongoose = require('mongoose');
const UsuarioSchema = new mongoose.Schema({
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    index: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  cadastro: {
    type: Date,
    default: Date.now
  }
})
  .plugin(require('mongoose-paginate'))
  .plugin(require('mongoose-unique-validator'))
  .set('toJSON', {
    transform(doc, ret) {
      return _.omit(ret, ['password']);
    }
  });

module.exports = mongoose.model('Usuario', UsuarioSchema);
