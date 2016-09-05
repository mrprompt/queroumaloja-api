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
 *     [
 *      {
 *        "_id": "493d0f9adfedd2fd2a3bef842",
 *        "items": [],
 *        "valor": 0.00
 *      },
 *      ...
 *    ]
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
 *        "_id": "493d0f9adfedd2fd2a3bef842",
 *        "items": [],
 *        "valor": 0.00
 *      }
 */
router.get('/:id', carrinho.abre);

/**
 * @api {post} /carrinho Cria um carrinho
 * @apiName CarrinhoAdiciona
 * @apiGroup Carrinho
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        items: [
 *          {
 *            "_id": "493d0f9adfedd2fd2a3bef842",
 *            "items": [],
 *            "valor": 0.00
 *          },
 *          ...
 *        ]
 *    }
 */
router.post('/', carrinho.adiciona);

/**
 * @api {put} /carrinho/:id Atualiza um carrinho
 * @apiName CarrinhoAtualiza
 * @apiGroup Carrinho
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.put('/:id', carrinho.atualiza);

/**
 * @api {delete} /carrinho/:id Atualiza um carrinho
 * @apiName CarrinhoApaga
 * @apiGroup Carrinho
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.delete('/:id', carrinho.apaga);

module.exports = router;
