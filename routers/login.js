'use strict';

var router = require('express').Router(),
  login = require('../controllers/login');

/**
 * @api {post} /login Autentica na API
 * @apiName LoginAdiciona
 * @apiGroup Login
 *
 * @apiParam {String} email Email de acesso.
 * @apiParam {String} password Senha de acesso.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *        {
 *          "object": "object",
 *          "has_more": false,
 *          "data": {
 *            "usuario": {
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
 *            },
 *            "token": {
 *              "__v": "0",
 *              "usuario": "513854b2426801348dfd75d6",
 *              "_id": "57dc59b26351390019da3adb",
 *              "validade": "2016-09-12T11:27:46.387Z",
 *              "cadastro": "2016-09-05T11:27:46.387Z",
 *              "conteudo": "2H6alaOc4Ti39HKZij9pj50QpMHiF2p4aKcbc++Fe4L6QaPF/IEsgrGt0iV2S/SUXUt61wBE9VA3osv5veA0Ew=="
 *            },
 *            "site": {
 *              "_id": "55743d2101fdb1d6a267a345",
 *              "dominio": "publiciti.com.br",
 *              "nome": "Publiciti",
 *              ...
 *            }
 *          },
 *          "itemCount": "1",
 *          "pageCount": "1"
 *        }
 */
router.post('/', login.adiciona);

module.exports = router;
