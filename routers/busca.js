'use strict';

var router = require('express').Router(), BuscaController = require('../controllers/busca');
var error = require('../middleware/error');

/**
 * @api {get} /busca/:palavra Busca um produto pela palavra chave
 * @apiName ProdutoBusca
 * @apiGroup Produto
 *
 * @apiParam {String} id Produto unique ID
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "object": "object",
 *        "has_more": true,
 *        "data": [{
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
 *        }, ...],
 *        "itemCount": "100",
 *        "pageCount": "10"
 *      }
 */
router.get('/:palavra', function (req, res) {
    var site = req.app.site._id;
    var palavra = req.params.palavra.toLocaleString();

    BuscaController.busca(site, palavra, function(err, data) {
        error(err, res, data, function (data) {
            res.json({
                object: 'list',
                data: data.docs,
                itemCount: data.total,
                pageCount: data.pages
            });
        });
    });
});

module.exports = router;
