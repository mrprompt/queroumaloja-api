'use strict';

var router = require('express').Router(),
  multer = require('multer'),
  upload = require('../modules/upload'),
  ProdutoController = require('../controllers/produto');

/**
 * @api {get} /produto Lista os produtos cadastrados
 * @apiName ProdutoLista
 * @apiGroup Produto
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "object": "list",
 *        "has_more": true,
 *        "data": [
 *          {
 *            "_id": "5762bbb9b3081d1900b0acbe",
 *            "titulo": "A TRIBO, A ALDEIA E O SONO",
 *            "descricao": "A TRIBO, A ALDEIA E O SONO",
 *            "imagem": {
 *              "public_id": "p47d42m0ebagghhzdptt",
 *              "version": "1466088376",
 *              "signature": "05a243d289f44d8aa27851fa6a49c8476785ce8b",
 *              "width": "1810",
 *              "height": "2551",
 *              "format": "jpg",
 *              "resource_type": "image",
 *              "bytes": "2249274",
 *              "type": "upload",
 *              "etag": "d796793e655a4f4dd254ea2c6e317cb7",
 *              "url": "http://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
 *              "secure_url": "https://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
 *              "_id": "5762bbb9b3081d1900b0acc3",
 *              "tags": [
 *              ],
 *              "created_at": "2016-06-16T14:46:16.000Z"
 *            },
 *            "categoria": {
 *              "titulo": "Livros",
 *              "uri": "livros",
 *              "categoria": {
 *                "titulo": "Livros e Coleções",
 *                "uri": "livros-e-colecoes",
 *                "_id": "5762bbb9b3081d1900b0acc2"
 *              },
 *              "_id": "5762bbb9b3081d1900b0acc1"
 *            },
 *            "dimensoes": {
 *              "altura": "0.01",
 *              "largura": "0.01",
 *              "comprimento": "0.01",
 *              "unidade": "cm",
 *              "_id": "5762bbb9b3081d1900b0acc0"
 *            },
 *            "peso": {
 *              "total": "0.001",
 *              "unidade": "gr",
 *              "_id": "5762bbb9b3081d1900b0acbf"
 *            },
 *            "__v": "0",
 *            "atualizacao": "2016-06-16T14:46:17.319Z",
 *            "cadastro": "2016-06-16T14:46:17.319Z",
 *            "quantidade": "0",
 *            "vendas": "0",
 *            "album": [
 *            ],
 *            "valor": [
 *              {
 *                "_id": "5762bbb9b3081d1900b0acc4",
 *                "moeda": "R$",
 *                "nome": "default",
 *                "valor": "23.9"
 *              }
 *            ],
 *            "codigo": "VL"
 *          },
 *          ...
 *        ],
 *        "itemCount": "100",
 *        "pageCount": "2"
 *      }
 */
router.get('/', ProdutoController.lista);

/**
 * @api {get} /produto/busca/:palavra Busca produtos por palavra chave
 * @apiName ProdutoBusca
 * @apiGroup Produto
 *
 * @apiParam {String} palavra Palavra chave a ser encontrada
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "object": "list",
 *        "has_more": true,
 *        "data": [
 *          {
 *            "_id": "5762bbb9b3081d1900b0acbe",
 *            "titulo": "A TRIBO, A ALDEIA E O SONO",
 *            "descricao": "A TRIBO, A ALDEIA E O SONO",
 *            "imagem": {
 *              "public_id": "p47d42m0ebagghhzdptt",
 *              "version": "1466088376",
 *              "signature": "05a243d289f44d8aa27851fa6a49c8476785ce8b",
 *              "width": "1810",
 *              "height": "2551",
 *              "format": "jpg",
 *              "resource_type": "image",
 *              "bytes": "2249274",
 *              "type": "upload",
 *              "etag": "d796793e655a4f4dd254ea2c6e317cb7",
 *              "url": "http://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
 *              "secure_url": "https://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
 *              "_id": "5762bbb9b3081d1900b0acc3",
 *              "tags": [
 *              ],
 *              "created_at": "2016-06-16T14:46:16.000Z"
 *            },
 *            "categoria": {
 *              "titulo": "Livros",
 *              "uri": "livros",
 *              "categoria": {
 *                "titulo": "Livros e Coleções",
 *                "uri": "livros-e-colecoes",
 *                "_id": "5762bbb9b3081d1900b0acc2"
 *              },
 *              "_id": "5762bbb9b3081d1900b0acc1"
 *            },
 *            "dimensoes": {
 *              "altura": "0.01",
 *              "largura": "0.01",
 *              "comprimento": "0.01",
 *              "unidade": "cm",
 *              "_id": "5762bbb9b3081d1900b0acc0"
 *            },
 *            "peso": {
 *              "total": "0.001",
 *              "unidade": "gr",
 *              "_id": "5762bbb9b3081d1900b0acbf"
 *            },
 *            "__v": "0",
 *            "atualizacao": "2016-06-16T14:46:17.319Z",
 *            "cadastro": "2016-06-16T14:46:17.319Z",
 *            "quantidade": "0",
 *            "vendas": "0",
 *            "album": [
 *            ],
 *            "valor": [
 *              {
 *                "_id": "5762bbb9b3081d1900b0acc4",
 *                "moeda": "R$",
 *                "nome": "default",
 *                "valor": "23.9"
 *              }
 *            ],
 *            "codigo": "VL"
 *          },
 *          ...
 *        ],
 *        "itemCount": "100",
 *        "pageCount": "2"
 *      }
 */
router.get('/busca/:palavra', ProdutoController.busca);

/**
 * @api {get} /produto/:id Abre um produto para visualização
 * @apiName ProdutoAbre
 * @apiGroup Produto
 *
 * @apiParam {String} id Produto unique ID
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "object": "object",
 *        "has_more": false,
 *        "data": {
 *            "_id": "5762bbb9b3081d1900b0acbe",
 *            "titulo": "A TRIBO, A ALDEIA E O SONO",
 *            "descricao": "A TRIBO, A ALDEIA E O SONO",
 *            "imagem": {
 *              "public_id": "p47d42m0ebagghhzdptt",
 *              "version": "1466088376",
 *              "signature": "05a243d289f44d8aa27851fa6a49c8476785ce8b",
 *              "width": "1810",
 *              "height": "2551",
 *              "format": "jpg",
 *              "resource_type": "image",
 *              "bytes": "2249274",
 *              "type": "upload",
 *              "etag": "d796793e655a4f4dd254ea2c6e317cb7",
 *              "url": "http://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
 *              "secure_url": "https://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
 *              "_id": "5762bbb9b3081d1900b0acc3",
 *              "tags": [
 *              ],
 *              "created_at": "2016-06-16T14:46:16.000Z"
 *            },
 *            "categoria": {
 *              "titulo": "Livros",
 *              "uri": "livros",
 *              "categoria": {
 *                "titulo": "Livros e Coleções",
 *                "uri": "livros-e-colecoes",
 *                "_id": "5762bbb9b3081d1900b0acc2"
 *              },
 *              "_id": "5762bbb9b3081d1900b0acc1"
 *            },
 *            "dimensoes": {
 *              "altura": "0.01",
 *              "largura": "0.01",
 *              "comprimento": "0.01",
 *              "unidade": "cm",
 *              "_id": "5762bbb9b3081d1900b0acc0"
 *            },
 *            "peso": {
 *              "total": "0.001",
 *              "unidade": "gr",
 *              "_id": "5762bbb9b3081d1900b0acbf"
 *            },
 *            "__v": "0",
 *            "atualizacao": "2016-06-16T14:46:17.319Z",
 *            "cadastro": "2016-06-16T14:46:17.319Z",
 *            "quantidade": "0",
 *            "vendas": "0",
 *            "album": [
 *            ],
 *            "valor": [
 *              {
 *                "_id": "5762bbb9b3081d1900b0acc4",
 *                "moeda": "R$",
 *                "nome": "default",
 *                "valor": "23.9"
 *              }
 *            ],
 *            "codigo": "VL"
 *        },
 *        "itemCount": "1",
 *        "pageCount": "1"
 *      }
 */
router.get('/:id', ProdutoController.abre);

/**
 * @api {post} /produto Cadastra um produto
 * @apiName ProdutoAdiciona
 * @apiGroup Produto
 *
 * @apiParam {String} codigo Código interno do produto.
 * @apiParam {String} titulo Título do produto.
 * @apiParam {String} descricao Descrição do produto.
 * @apiParam {Object} valor Valor do produto {valor: number, nome: string, moeda: string} .
 * @apiParam {Object} categoria Categoria {titulo: string, uri: string, categoria: { titulo: string, uri: string}}.
 * @apiParam {Boolean} ativo Produto (in)ativo.
 * @apiParam {Object} imagem Imagem de representação do produto {url: string, secure_url: string}
 * @apiParam {Object} album Álbum de imagens, array de {imagem}
 * @apiParam {Object} dimesoes Dimensões do produto {altura, largura, comprimento, unidade}
 * @apiParam {Number} vendas Número de vendas do produto.
 * @apiParam {Number} quantidade Quantidade de ítens em estoque.
 * @apiParam {Object} peso Peso do produto {total, unidade}.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *      {
 *        "object": "object",
 *        "has_more": false,
 *        "data": {
 *            "_id": "5762bbb9b3081d1900b0acbe",
 *            "titulo": "A TRIBO, A ALDEIA E O SONO",
 *            "descricao": "A TRIBO, A ALDEIA E O SONO",
 *            "imagem": {
 *              "public_id": "p47d42m0ebagghhzdptt",
 *              "version": "1466088376",
 *              "signature": "05a243d289f44d8aa27851fa6a49c8476785ce8b",
 *              "width": "1810",
 *              "height": "2551",
 *              "format": "jpg",
 *              "resource_type": "image",
 *              "bytes": "2249274",
 *              "type": "upload",
 *              "etag": "d796793e655a4f4dd254ea2c6e317cb7",
 *              "url": "http://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
 *              "secure_url": "https://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
 *              "_id": "5762bbb9b3081d1900b0acc3",
 *              "tags": [
 *              ],
 *              "created_at": "2016-06-16T14:46:16.000Z"
 *            },
 *            "categoria": {
 *              "titulo": "Livros",
 *              "uri": "livros",
 *              "categoria": {
 *                "titulo": "Livros e Coleções",
 *                "uri": "livros-e-colecoes",
 *                "_id": "5762bbb9b3081d1900b0acc2"
 *              },
 *              "_id": "5762bbb9b3081d1900b0acc1"
 *            },
 *            "dimensoes": {
 *              "altura": "0.01",
 *              "largura": "0.01",
 *              "comprimento": "0.01",
 *              "unidade": "cm",
 *              "_id": "5762bbb9b3081d1900b0acc0"
 *            },
 *            "peso": {
 *              "total": "0.001",
 *              "unidade": "gr",
 *              "_id": "5762bbb9b3081d1900b0acbf"
 *            },
 *            "__v": "0",
 *            "atualizacao": "2016-06-16T14:46:17.319Z",
 *            "cadastro": "2016-06-16T14:46:17.319Z",
 *            "quantidade": "0",
 *            "vendas": "0",
 *            "album": [
 *            ],
 *            "valor": [
 *              {
 *                "_id": "5762bbb9b3081d1900b0acc4",
 *                "moeda": "R$",
 *                "nome": "default",
 *                "valor": "23.9"
 *              }
 *            ],
 *            "codigo": "VL"
 *        },
 *        "itemCount": "1",
 *        "pageCount": "1"
 *      }
 */
router.post('/', multer({dest: '/tmp/'}).single('imagem'), upload, ProdutoController.adiciona);

/**
 * @api {put} /produto/:id Atualiza os dados de um produto
 * @apiName ProdutoAtualiza
 * @apiGroup Produto
 *
 * @apiParam {String} id Produto unique ID.
 * @apiParam {String} codigo Código interno do produto.
 * @apiParam {String} titulo Título do produto.
 * @apiParam {String} descricao Descrição do produto.
 * @apiParam {Object} valor Valor do produto {valor: number, nome: string, moeda: string} .
 * @apiParam {Object} categoria Categoria {titulo: string, uri: string, categoria: { titulo: string, uri: string}}.
 * @apiParam {Boolean} ativo Produto (in)ativo.
 * @apiParam {Object} imagem Imagem de representação do produto {url: string, secure_url: string}
 * @apiParam {Object} album Álbum de imagens, array de {imagem}
 * @apiParam {Object} dimesoes Dimensões do produto {altura, largura, comprimento, unidade}
 * @apiParam {Number} vendas Número de vendas do produto.
 * @apiParam {Number} quantidade Quantidade de ítens em estoque.
 * @apiParam {Object} peso Peso do produto {total, unidade}.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.put('/:id', ProdutoController.atualiza);

/**
 * @api {delete} /produto/:id Apagar produto
 * @apiName ProdutoApaga
 * @apiGroup Produto
 *
 * @apiParam {String} id Produto unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.delete('/:id', ProdutoController.apaga);

/**
 * @api {post} /produto/:id/album Adiciona uma imagem ao álbum do produto
 * @apiName ProdutoAlbumAdiciona
 * @apiGroup Produto
 *
 * @apiParam {String} id Produto unique ID.
 * @apiParam {Object} imagem Imagem do produto {url: string, secure_url: string}
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *      {
 *        "object": "object",
 *        "has_more": false,
 *        "data": {
 *            "_id": "5762bbb9b3081d1900b0acbe",
 *            "titulo": "A TRIBO, A ALDEIA E O SONO",
 *            "descricao": "A TRIBO, A ALDEIA E O SONO",
 *            "imagem": {
 *              "public_id": "p47d42m0ebagghhzdptt",
 *              "version": "1466088376",
 *              "signature": "05a243d289f44d8aa27851fa6a49c8476785ce8b",
 *              "width": "1810",
 *              "height": "2551",
 *              "format": "jpg",
 *              "resource_type": "image",
 *              "bytes": "2249274",
 *              "type": "upload",
 *              "etag": "d796793e655a4f4dd254ea2c6e317cb7",
 *              "url": "http://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
 *              "secure_url": "https://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
 *              "_id": "5762bbb9b3081d1900b0acc3",
 *              "tags": [
 *              ],
 *              "created_at": "2016-06-16T14:46:16.000Z"
 *            },
 *            "categoria": {
 *              "titulo": "Livros",
 *              "uri": "livros",
 *              "categoria": {
 *                "titulo": "Livros e Coleções",
 *                "uri": "livros-e-colecoes",
 *                "_id": "5762bbb9b3081d1900b0acc2"
 *              },
 *              "_id": "5762bbb9b3081d1900b0acc1"
 *            },
 *            "dimensoes": {
 *              "altura": "0.01",
 *              "largura": "0.01",
 *              "comprimento": "0.01",
 *              "unidade": "cm",
 *              "_id": "5762bbb9b3081d1900b0acc0"
 *            },
 *            "peso": {
 *              "total": "0.001",
 *              "unidade": "gr",
 *              "_id": "5762bbb9b3081d1900b0acbf"
 *            },
 *            "__v": "0",
 *            "atualizacao": "2016-06-16T14:46:17.319Z",
 *            "cadastro": "2016-06-16T14:46:17.319Z",
 *            "quantidade": "0",
 *            "vendas": "0",
 *            "album": [
 *            ],
 *            "valor": [
 *              {
 *                "_id": "5762bbb9b3081d1900b0acc4",
 *                "moeda": "R$",
 *                "nome": "default",
 *                "valor": "23.9"
 *              }
 *            ],
 *            "codigo": "VL"
 *        },
 *        "itemCount": "1",
 *        "pageCount": "1"
 *      }
 */
router.post('/:id/album', multer({dest: '/tmp/'}).single('imagem'), upload, ProdutoController.adicionaImagem);

/**
 * @api {delete} /produto/:id/album/:img Apaga uma imagem do álbum do produto
 * @apiName ProdutoAlbumApagaImagem
 * @apiGroup Produto
 *
 * @apiParam {String} id Produto unique ID.
 * @apiParam {String} img Produto Imagem unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.delete('/:id/album/:img', ProdutoController.apagaImagem);

module.exports = router;
