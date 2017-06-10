const ProdutoSchema = require('../schemas/produto');

const ImagemModel = function () {
};

/**
 * Insere uma imagem no álbum do produto
 */
ImagemModel.prototype.adicionaImagem = (id, site, imagem, done) => {
  ProdutoSchema.findOneAndUpdate(
    {
      _id: id,
      site
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
ImagemModel.prototype.apagaImagem = (id, site, imagem, done) => {
  ProdutoSchema.findOneAndUpdate(
    {
      _id: id,
      site
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

module.exports = new ImagemModel();
