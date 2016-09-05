'use strict';

var router = require('express').Router(),
  site = require('../controllers/site');

/**
 * @api {get} /site Lista os sites cadastrados
 * @apiName SiteLista
 * @apiGroup Site
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "object": "list",
 *        "has_more": true,
 *        "data": [
 *          {
 *            "_id": "5446c3c8e505da7d9dd35b39",
 *            "dominio": "queroumaloja.com.br",
 *            "nome": "queroumaloja",
 *            "entrega": [
 *              {
 *                "modalidade": "proprio",
 *                "valor": "0"
 *              },
 *              {
 *                "modalidade": "sedex",
 *                "valor": "0"
 *              }
 *            ],
 *            "categorias": [
 *              {
 *                "titulo": "Parques",
 *                "uri": "parques",
 *                "categorias": [
 *                  {
 *                    "titulo": "Madeira",
 *                    "uri": "madeira"
 *                  }
 *                ]
 *              },
 *              ...
 *            ],
 *            "telefones": [
 *              {
 *                "numero": "+55 48 0000-0000",
 *                "nome": "contato",
 *                "tipo": "comercial"
 *              }
 *            ],
 *            "enderecos": [
 *              {
 *                "cep": "0",
 *                "cidade": "Florianópolis",
 *                "estado": "SC",
 *                "bairro": "0",
 *                "logradouro": "Rua Exemplo - Centro - Florianóoplis - Santa Catarina - Brasil",
 *                "tipo": "comercial",
 *                "numero": "0",
 *                "complemento": ""
 *              }
 *            ],
 *            "emails": [
 *              {
 *                "endereco": "contato@queroumaloja.com.br",
 *                "nome": "contato"
 *              }
 *            ]
 *          },
 *          ...
 *        ],
 *        "itemCount": "100",
 *        "pageCount": "4"
 *      }
 */
router.get('/', site.lista);

/**
 * @api {get} /site/:id Abre um site para visualização
 * @apiName SiteAbre
 * @apiGroup Site
 *
 * @apiParam {String} id Site unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "object": "list",
 *        "has_more": false,
 *        "data": {
 *            "_id": "5446c3c8e505da7d9dd35b39",
 *            "dominio": "queroumaloja.com.br",
 *            "nome": "queroumaloja",
 *            "entrega": [
 *              {
 *                "modalidade": "proprio",
 *                "valor": "0"
 *              },
 *              {
 *                "modalidade": "sedex",
 *                "valor": "0"
 *              }
 *            ],
 *            "categorias": [
 *              {
 *                "titulo": "Parques",
 *                "uri": "parques",
 *                "categorias": [
 *                  {
 *                    "titulo": "Madeira",
 *                    "uri": "madeira"
 *                  }
 *                ]
 *              },
 *              ...
 *            ],
 *            "telefones": [
 *              {
 *                "numero": "+55 48 0000-0000",
 *                "nome": "contato",
 *                "tipo": "comercial"
 *              }
 *            ],
 *            "enderecos": [
 *              {
 *                "cep": "0",
 *                "cidade": "Florianópolis",
 *                "estado": "SC",
 *                "bairro": "0",
 *                "logradouro": "Rua Exemplo - Centro - Florianóoplis - Santa Catarina - Brasil",
 *                "tipo": "comercial",
 *                "numero": "0",
 *                "complemento": ""
 *              }
 *            ],
 *            "emails": [
 *              {
 *                "endereco": "contato@queroumaloja.com.br",
 *                "nome": "contato"
 *              }
 *            ]
 *        },
 *        "itemCount": "1",
 *        "pageCount": "1"
 *      }
 */
router.get('/:id', site.abre);

/**
 * @api {post} /site Cadastra um site.
 * @apiName SiteAdiciona
 * @apiGroup Site
 *
 * @apiParam {String} nome
 * @apiParam {String} dominio
 * @apiParam {Object} emails [{nome, endereco}]
 * @apiParam {Object} endereco [{logradouro, complemento, numero, bairro, cep, cidade, estado, tipo (comercial, residencial)}]
 * @apiParam {Object} telefones [{nome, numero, tipo (residencial, comercial)}]
 * @apiParam {Object} categorias [{nome, uri, categorias: { nome, uri }}]
 * @apiParam {Object} entrega [{modalidade: ('pac', 'sedex', 'transportadora', 'moto', 'proprio', 'outro', 'nenhuma'), valor}]
 * @apiParam {Boolean} ativo
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *      {
 *        "object": "object",
 *        "has_more": false,
 *        "data": {
 *            "_id": "5446c3c8e505da7d9dd35b39",
 *            "dominio": "queroumaloja.com.br",
 *            "nome": "queroumaloja",
 *            "entrega": [
 *              {
 *                "modalidade": "proprio",
 *                "valor": "0"
 *              },
 *              {
 *                "modalidade": "sedex",
 *                "valor": "0"
 *              }
 *            ],
 *            "categorias": [
 *              {
 *                "titulo": "Parques",
 *                "uri": "parques",
 *                "categorias": [
 *                  {
 *                    "titulo": "Madeira",
 *                    "uri": "madeira"
 *                  }
 *                ]
 *              },
 *              ...
 *            ],
 *            "telefones": [
 *              {
 *                "numero": "+55 48 0000-0000",
 *                "nome": "contato",
 *                "tipo": "comercial"
 *              }
 *            ],
 *            "enderecos": [
 *              {
 *                "cep": "0",
 *                "cidade": "Florianópolis",
 *                "estado": "SC",
 *                "bairro": "0",
 *                "logradouro": "Rua Exemplo - Centro - Florianóoplis - Santa Catarina - Brasil",
 *                "tipo": "comercial",
 *                "numero": "0",
 *                "complemento": ""
 *              }
 *            ],
 *            "emails": [
 *              {
 *                "endereco": "contato@queroumaloja.com.br",
 *                "nome": "contato"
 *              }
 *            ]
 *        },
 *        "itemCount": "1",
 *        "pageCount": "1"
 *      }
 */
router.post('/', site.adiciona);

/**
 * @api {put} /site/:id Atualiza um site.
 * @apiName SiteAtualiza
 * @apiGroup Site
 *
 * @apiParam {String} id Site unique ID.
 * @apiParam {String} nome
 * @apiParam {String} dominio
 * @apiParam {Object} emails [{nome, endereco}]
 * @apiParam {Object} endereco [{logradouro, complemento, numero, bairro, cep, cidade, estado, tipo (comercial, residencial)}]
 * @apiParam {Object} telefones [{nome, numero, tipo (residencial, comercial)}]
 * @apiParam {Object} categorias [{nome, uri, categorias: { nome, uri }}]
 * @apiParam {Object} entrega [{modalidade: ('pac', 'sedex', 'transportadora', 'moto', 'proprio', 'outro', 'nenhuma'), valor}]
 * @apiParam {Boolean} ativo
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.put('/:id', site.atualiza);

/**
 * @api {delete} /site/:id Apaga um site.
 * @apiName SiteApaga
 * @apiGroup Site
 *
 * @apiParam {String} id Site unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.delete('/:id', site.apaga);

module.exports = router;
