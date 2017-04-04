'use strict';

var ProdutoSchema = require('../schemas/produto'),
 ImagemModel = function () {};

/**
 * Insere uma imagem no álbum do produto
 */
ImagemModel.prototype.adicionaImagem = function (id, site, imagem, done) {
 ProdutoSchema.findOneAndUpdate(
  {
   _id: id,
   site: site
  },
  {
   $push: {
    album: imagem
   }
  },
  {
   new: true,
   multi: true,
   safe: true,
   upsert: true
  },
  done
 );
};

/**
 * Remove uma imagem do álbum do produto
 */
ImagemModel.prototype.apagaImagem = function (id, site, imagem, done) {
 ProdutoSchema.findOneAndUpdate(
  {
   _id: id,
   site: site
  },
  {
   $pull: {
    album: {
     _id: imagem
    }
   }
  },
  {
   new: true,
   multi: true
  },
  done
 );
};

module.exports = new ImagemModel;
