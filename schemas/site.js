const _ = require('underscore');
const mongoose = require('mongoose');
const SiteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  dominio: {
    type: String,
    index: true,
    required: true,
    unique: true
  },
  emails: [
    new mongoose.Schema({
      nome: {
        type: String,
        required: true
      },
      endereco: {
        type: String,
        required: true
      }
    })
  ],
  enderecos: [
    new mongoose.Schema({
      logradouro: {
        type: String,
        required: true
      },
      complemento: {
        type: String,
        default: ''
      },
      numero: {
        type: Number,
        default: 0
      },
      bairro: {
        type: String,
        required: true
      },
      cep: {
        type: String,
        trim: true
      },
      cidade: {
        type: String,
        required: true
      },
      estado: {
        type: String,
        required: true
      },
      tipo: {
        type: String,
        enum: ['comercial', 'residencial'],
        default: 'residencial'
      }
    })
  ],
  telefones: [
    new mongoose.Schema({
      nome: {
        type: String,
        required: true
      },
      numero: {
        type: String,
        required: true
      },
      tipo: {
        type: String,
        enum: ['comercial', 'residencial'],
        default: 'comercial'
      }
    })
  ],
  config: mongoose.Schema({
    cloudinary: mongoose.Schema({
      upload_endpoint: {
        type: String,
        default: 'https://api.cloudinary.com/v1_1/'
      },
      cloud_name: {
        type: String,
        required: true,
        trim: true
      },
      upload_preset: {
        type: String,
        required: true,
        trim: true
      },
      api_key: {
        type: String,
        required: true,
        trim: true
      },
      api_secret: {
        type: String,
        required: true,
        trim: true
      }
    })
  }),
  categorias: [
    mongoose.Schema({
      titulo: {
        type: String,
        required: true
      },
      uri: {
        type: String,
        required: true,
        trim: true
      },
      categorias: [
        mongoose.Schema({
          titulo: {
            type: String,
            required: true
          },
          uri: {
            type: String,
            required: true,
            trim: true
          }
        })
      ]
    })
  ],
  entrega: [
    mongoose.Schema({
      modalidade: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ['pac', 'sedex', 'transportadora', 'moto', 'proprio', 'outro', 'nenhuma']
      },
      valor: {
        type: Number,
        default: 0.00
      }
    })
  ],
  ativo: {
    type: Boolean,
    default: false
  }
})
    .plugin(require('mongoose-paginate'))
    .plugin(require('mongoose-unique-validator'))
    .set('toJSON', {
      transform (doc, ret) {
        return _.omit(ret, ['config', 'ativo']);
      }
    });

module.exports = mongoose.model('Site', SiteSchema);
