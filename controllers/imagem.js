'use strict';

var ImagemModel = require('../models/imagem'), ImagemController = function () {};

/**
 * Insere uma imagem no álbum do produto
 */
ImagemController.prototype.adiciona = function (produto, site, params, done) {
    ImagemModel.adicionaImagem(produto, site, params, done);
};

/**
 * Remove uma imagem do álbum do produto
 */
ImagemController.prototype.apaga = function (id, site, imagem, done) {
    ImagemModel.apagaImagem(id, site, imagem, done);
};

module.exports = new ImagemController;
