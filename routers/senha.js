'use strict';

var router = require('express').Router(),
  senha = require('../controllers/senha');

/**
 * @api {post} /senha Cria uma nova senha aleatória para o usuário logado.
 * @apiName SenhaAdiciona
 * @apiGroup Senha
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *        {
 *          "object": "object",
 *          "has_more": false,
 *          "data": {
 *              "_id": "543854a2436902348cfd75d6",
 *              "email": "foo@bar.bar",
 *              "localidade": {
 *                "cidade": "Florianópolis",
 *                "estado": "Santa Catarina",
 *                "uf": "SC"
 *              },
 *              "nome": "Foo Bar Bar",
 *              "cadastro": "2016-09-05T11:27:46.383Z",
 *              "nivel": "comprador",
 *              "endereco": [
 *               ...
 *              ]
 *          },
 *          "itemCount": "1",
 *          "pageCount": "1"
 *        }
 */
router.post('/:usuario', senha.adiciona);

/**
 * @api {put} /senha Atualiza a senha do usuário logado
 * @apiName SenhaAtualiza
 * @apiGroup Senha
 *
 * @apiParam {String} password Nova senha
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.put('/', senha.atualiza);

module.exports = router;
