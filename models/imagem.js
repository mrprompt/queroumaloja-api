'use strict';

var ProdutoModel = require('../schemas/produto'),
  ImagemDAO = function () {};

/**
 * Insere uma imagem no álbum do produto
 */
ImagemDAO.prototype.adicionaImagem = function (id, site, imagem, done) {
    ProdutoModel.findOneAndUpdate(
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
ImagemDAO.prototype.apagaImagem = function (id, site, imagem, done) {
    ProdutoModel.findOneAndUpdate(
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

module.exports = new ImagemDAO;
