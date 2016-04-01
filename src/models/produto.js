'use strict';

var mongoose        = require('mongoose');
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
    valor: {
        type: Number,
        default: 0.00
    },
    valores: [
        new mongoose.Schema({
            valor: {
                type: Number,
                default: 0.00
            },
            nome: {
                type: String
            }
        })
    ],
    categoria: {
        type: Object
    },
    ativo: {
        type: Boolean,
        default: true
    },
    imagem: new mongoose.Schema({
        public_id: {
            type: String
        },
        version: {
            type: String
        },
        signature: {
            type: String
        },
        width: {
            type: Number
        },
        height: {
            type: Number
        },
        format: {
            type: String
        },
        resource_type: {
            type: String
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        tags: {
            type: []
        },
        bytes: {
            type: Number
        },
        type: {
            type: String
        },
        etag: {
            type: String
        },
        url: {
            type: String
        },
        secure_url: {
            type: String
        }
    }),
    album:  [
        new mongoose.Schema({
            public_id: {
                type: String
            },
            version: {
                type: String
            },
            signature: {
                type: String
            },
            width: {
                type: Number
            },
            height: {
                type: Number
            },
            format: {
                type: String
            },
            resource_type: {
                type: String
            },
            created_at: {
                type: Date,
                default: Date.now
            },
            tags: {
                type: []
            },
            bytes: {
                type: Number
            },
            type: {
                type: String
            },
            etag: {
                type: String
            },
            url: {
                type: String
            },
            secure_url: {
                type: String
            }
        })
    ],
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
    .set('toJSON', {
        transform: function(doc, ret, options) {
            delete ret.site;
            delete ret.ativo;

            return ret;
        }
    })
    .index({ '$**': 'text' });

module.exports = mongoose.model('Produto', ProdutoSchema);
