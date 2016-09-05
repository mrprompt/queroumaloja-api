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
   *     {
   *        token: "f0000-s9992-2sdfsf"
   *        usuario: {
   *            ...
   *          }
   *    }
   */
router.post('/', login.adiciona);

module.exports = router;
