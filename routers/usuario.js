'use strict';

var router = require('express').Router(),
  usuario = require('../controllers/usuario');

/**
 * @api {get} /usuario Lista usuários cadastrados
 * @apiName UsuarioLista
 * @apiGroup Usuario
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "object": "list",
 *        "has_more": true,
 *        "data": [
 *          {
 *            "_id": "543854a2436802348dfd75d6",
 *            "email": "contato@queroumaloja.com.br",
 *            "localidade": {
 *              "cidade": "Florianópolis",
 *              "estado": "Santa Catarina",
 *              "uf": "SC"
 *            },
 *            "nome": "queroumaloja Papelaria",
 *            "cadastro": "2016-09-05T12:32:17.148Z",
 *            "nivel": "comprador",
 *            "endereco": [
 *            ]
 *          },
 *          ...
 *        ],
 *        "itemCount": "100",
 *        "pageCount": "2"
 *      }
 */
router.get('/', usuario.lista);

/**
 * @api {get} /usuario/:id Visualiza um usuario
 * @apiName UsuarioAbre
 * @apiGroup Usuario
 *
 * @apiParam {String} id Site unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "object": "object",
 *        "has_more": false,
 *        "data": {
 *            "_id": "543854a2436802348dfd75d6",
 *            "email": "contato@queroumaloja.com.br",
 *            "localidade": {
 *              "cidade": "Florianópolis",
 *              "estado": "Santa Catarina",
 *              "uf": "SC"
 *            },
 *            "nome": "queroumaloja Papelaria",
 *            "cadastro": "2016-09-05T12:32:17.148Z",
 *            "nivel": "comprador",
 *            "endereco": [
 *            ]
 *          },
 *        "itemCount": "1",
 *        "pageCount": "1"
 *      }
 */
router.get('/:id', usuario.abre);

/**
 * @api {post} /usuario Cadastra um usuário
 * @apiName UsuarioAdiciona
 * @apiGroup Usuario
 *
 * @apiParam {String} nome
 * @apiParam {String} email
 * @apiParam {String} password
 * @apiParam {string} nivel ('administrador', 'editor', 'usuario', 'comprador')
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *      {
 *        "object": "object",
 *        "has_more": false,
 *        "data": {
 *            "_id": "543854a2436802348dfd75d6",
 *            "email": "contato@queroumaloja.com.br",
 *            "localidade": {
 *              "cidade": "Florianópolis",
 *              "estado": "Santa Catarina",
 *              "uf": "SC"
 *            },
 *            "nome": "queroumaloja Papelaria",
 *            "cadastro": "2016-09-05T12:32:17.148Z",
 *            "nivel": "comprador",
 *            "endereco": [
 *            ]
 *          },
 *        "itemCount": "1",
 *        "pageCount": "1"
 *      }
 */
router.post('/', usuario.adiciona);

/**
 * @api {put} /usuario/:id Atualiza um usuário
 * @apiName UsuarioAtualiza
 * @apiGroup Usuario
 *
 * @apiParam {String} id Usuário unique id
 * @apiParam {String} nome
 * @apiParam {String} email
 * @apiParam {string} nivel ('administrador', 'editor', 'usuario', 'comprador')
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.put('/:id', usuario.atualiza);

/**
 * @api {delete} /usuario/:id Apaga um usuário
 * @apiName UsuarioApaga
 * @apiGroup Usuario
 *
 * @apiParam {String} id Usuário unique id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.delete('/:id', usuario.apaga);

module.exports = router;
