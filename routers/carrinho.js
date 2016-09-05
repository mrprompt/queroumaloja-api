'use strict';

var router = require('express').Router(),
  carrinho = require('../controllers/carrinho');

/**
 * @api {get} /carrinho Lista todos os carrinhos
 * @apiName CarrinhoLista
 * @apiGroup Carrinho
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "object": "list",
 *        "has_more": false,
 *        "data": [
 *        ],
 *        "itemCount": "0",
 *        "pageCount": "1"
 *      }
 */
router.get('/', carrinho.lista);

/**
 * @api {get} /carrinho/:id Abre um carrinho para visualização
 * @apiName CarrinhoAbre
 * @apiGroup Carrinho
 *
 * @apiParam {Number} id Carrinho unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "object": "list",
 *        "has_more": false,
 *        "data": [
 *          {
 *            "_id": "493d0f9adfedd2fd2a3bef842",
 *            "items": [],
 *            "valor": 0.00
 *          }
 *        ],
 *        "itemCount": "0",
 *        "pageCount": "1"
 *      }
 */
router.get('/:id', carrinho.abre);

/**
 * @api {post} /carrinho Cria um carrinho
 * @apiName CarrinhoAdiciona
 * @apiGroup Carrinho
 *
 * @apiParam {String} token Token de identificação da transação no gateway.
 * @apiParam {Number} valor Valor total do carrinho.
 * @apiParam {String} tipo Gateway ('local', 'pagarme', 'pagseguro').
 * @apiParam {String} entrega Tipo de entraga ('pac', 'sedex', 'transportadora', 'moto', 'proprio', 'outro', 'nenhuma').
 * @apiParam {Array} items Array de Produtos (produto (id), quantidade (int)).
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *      {
 *        "object": "list",
 *        "has_more": false,
 *        "data": [
 *          {
 *              items: [
 *                {
 *                  "_id": "493d0f9adfedd2fd2a3bef842",
 *                  "items": [],
 *                  "valor": 0.00
 *                },
 *                ...
 *              ]
 *          }
 *      ],
 *        "itemCount": "0",
 *        "pageCount": "1"
 *      }
 */
router.post('/', carrinho.adiciona);

/**
 * @api {put} /carrinho/:id Atualiza um carrinho
 * @apiName CarrinhoAtualiza
 * @apiGroup Carrinho
 *
 * @apiParam {Number} id Carrinho unique ID.
 * @apiParam {String} token Token de identificação da transação no gateway.
 * @apiParam {Number} valor Valor total do carrinho.
 * @apiParam {String} tipo Gateway ('local', 'pagarme', 'pagseguro').
 * @apiParam {String} entrega Tipo de entraga ('pac', 'sedex', 'transportadora', 'moto', 'proprio', 'outro', 'nenhuma').
 * @apiParam {Array} items Array de Produtos (produto (id), quantidade (int)).
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.put('/:id', carrinho.atualiza);

/**
 * @api {delete} /carrinho/:id Apaga um carrinho
 * @apiName CarrinhoApaga
 * @apiGroup Carrinho
 *
 * @apiParam {Number} id Carrinho unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.delete('/:id', carrinho.apaga);

module.exports = router;
