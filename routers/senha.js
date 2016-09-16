'use strict';

var router = require('express').Router(),
  senha = require('../controllers/senha');

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
router.put('/senha/', function (req, res, done) {
  senha.atualiza(req.app.usuario._id, req.app.site._id, req.body.password_encrypted, function (err, data) {
    if (err) {
      res.status(500).json({
        object: 'error',
        data: 'Não foi possível atualizar a senha',
        itemCount: 0,
        pageCount: 0
      });

      return;
    }

    res.status(204).json({});
  })
});

module.exports = router;
